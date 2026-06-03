require "rails_helper"

RSpec.describe MoonPhaseService do
  let(:service) { described_class.new }

  let(:usno_response) do
    {
      "properties" => {
        "data" => {
          "curphase" => "Waning Gibbous",
          "fracillum" => "96%",
          "closestphase" => {
            "phase" => "Full Moon",
            "day" => 31,
            "month" => 5,
            "year" => 2026,
            "time" => "08:45"
          }
        }
      }
    }.to_json
  end

  before do
    Rails.cache.clear
    stub_request(:get, /aa\.usno\.navy\.mil/)
      .to_return(status: 200, body: usno_response, headers: { "Content-Type" => "application/json" })
  end

  describe "#current_phase" do
    subject(:result) { service.current_phase }

    it "returns the current phase name" do
      expect(result[:phase_name]).to eq("Waning Gibbous")
    end

    it "returns the illumination percentage" do
      expect(result[:illumination]).to eq(96)
    end

    it "returns a phase emoji" do
      expect(result[:phase_emoji]).to be_a(String)
      expect(result[:phase_emoji]).not_to be_empty
    end

    it "returns a cat-themed description" do
      expect(result[:cat_description]).to be_a(String)
      expect(result[:cat_description]).not_to be_empty
    end

    it "calls the USNO API" do
      result
      expect(WebMock).to have_requested(:get, /aa\.usno\.navy\.mil/)
    end

    it "caches the response" do
      allow(Rails).to receive(:cache).and_return(ActiveSupport::Cache::MemoryStore.new)
      2.times { service.current_phase }
      expect(WebMock).to have_requested(:get, /aa\.usno\.navy\.mil/).once
    end
  end

  describe "across all moon phases" do
    phases = {
      "New Moon"        => { emoji: "\u{1F311}", illumination: "0%" },
      "Waxing Crescent" => { emoji: "\u{1F312}", illumination: "25%" },
      "First Quarter"   => { emoji: "\u{1F313}", illumination: "50%" },
      "Waxing Gibbous"  => { emoji: "\u{1F314}", illumination: "75%" },
      "Full Moon"       => { emoji: "\u{1F315}", illumination: "100%" },
      "Waning Gibbous"  => { emoji: "\u{1F316}", illumination: "96%" },
      "Last Quarter"    => { emoji: "\u{1F317}", illumination: "50%" },
      "Waning Crescent" => { emoji: "\u{1F318}", illumination: "10%" }
    }

    phases.each do |phase_name, expected|
      context "when the moon is in #{phase_name}" do
        before do
          Rails.cache.clear
          body = {
            "properties" => {
              "data" => {
                "curphase" => phase_name,
                "fracillum" => expected[:illumination],
                "closestphase" => { "phase" => phase_name, "day" => 1, "month" => 1, "year" => 2026, "time" => "00:00" }
              }
            }
          }.to_json
          stub_request(:get, /aa\.usno\.navy\.mil/)
            .to_return(status: 200, body: body, headers: { "Content-Type" => "application/json" })
        end

        it "returns the correct phase name" do
          expect(service.current_phase[:phase_name]).to eq(phase_name)
        end

        it "returns the correct emoji" do
          expect(service.current_phase[:phase_emoji]).to eq(expected[:emoji])
        end

        it "returns a cat-themed description" do
          desc = service.current_phase[:cat_description]
          expect(desc).to be_a(String)
          expect(desc.length).to be > 10
        end

        it "returns the correct illumination" do
          expect(service.current_phase[:illumination]).to eq(expected[:illumination].to_i)
        end
      end
    end

    context "when the API returns an unknown phase" do
      before do
        Rails.cache.clear
        body = {
          "properties" => {
            "data" => {
              "curphase" => "Super Blood Moon",
              "fracillum" => "100%",
              "closestphase" => { "phase" => "Full Moon", "day" => 1, "month" => 1, "year" => 2026, "time" => "00:00" }
            }
          }
        }.to_json
        stub_request(:get, /aa\.usno\.navy\.mil/)
          .to_return(status: 200, body: body, headers: { "Content-Type" => "application/json" })
      end

      it "returns a fallback emoji" do
        expect(service.current_phase[:phase_emoji]).to eq("\u{1F319}")
      end

      it "returns a fallback cat description" do
        desc = service.current_phase[:cat_description]
        expect(desc).to include("mysterious")
      end
    end
  end
end
