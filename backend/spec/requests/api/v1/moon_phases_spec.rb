require "rails_helper"

RSpec.describe "GET /api/v1/moon_phase", type: :request do
  let(:phase_data) do
    {
      phase_name: "Waning Gibbous",
      illumination: 96,
      phase_emoji: "\u{1F316}",
      cat_description: "The moon is winding down, like a cat after a long play session"
    }
  end

  before do
    allow_any_instance_of(MoonPhaseService).to receive(:current_phase).and_return(phase_data)
  end

  it "returns a successful response" do
    get "/api/v1/moon_phase"
    expect(response).to have_http_status(:ok)
  end

  it "returns JSON with moon phase data" do
    get "/api/v1/moon_phase"
    json = JSON.parse(response.body)

    expect(json["phase_name"]).to eq("Waning Gibbous")
    expect(json["illumination"]).to eq(96)
    expect(json["phase_emoji"]).to eq("\u{1F316}")
    expect(json["cat_description"]).to eq("The moon is winding down, like a cat after a long play session")
  end
end
