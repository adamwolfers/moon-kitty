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

    it "calls the USNO API" do
      result
      expect(WebMock).to have_requested(:get, /aa\.usno\.navy\.mil/)
    end

    it "caches the response" do
      2.times { service.current_phase }
      expect(WebMock).to have_requested(:get, /aa\.usno\.navy\.mil/).once
    end
  end
end
