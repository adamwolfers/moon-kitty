class MoonPhaseService
  USNO_API_URL = "https://aa.usno.navy.mil/api/rstt/oneday"
  # Phase and illumination are location-independent; coords are required by the API
  # but only affect moonrise/moonset times, which we don't use.
  DEFAULT_COORDS = ENV.fetch("USNO_COORDS", "40.7,-74.0")

  CAT_DESCRIPTIONS = {
    "New Moon" => "The New Mew-n is hiding, just like a cat in a cardboard box",
    "Waxing Crescent" => "A sliver of moonlight appears, like a cat's eye opening from a nap",
    "First Quarter" => "The half moon hangs like a cat perched on a windowsill",
    "Waxing Gibbous" => "The moon is almost full, round as a well-fed kitty",
    "Full Moon" => "The Full Meow-n shines bright, time for midnight zoomies",
    "Waning Gibbous" => "The moon is winding down, like a cat after a long play session",
    "Last Quarter" => "Half the moon remains, like a cat half-hidden under a blanket",
    "Waning Crescent" => "Just a whisker of moon left before the sky goes dark"
  }.freeze

  PHASE_EMOJIS = {
    "New Moon" => "\u{1F311}",
    "Waxing Crescent" => "\u{1F312}",
    "First Quarter" => "\u{1F313}",
    "Waxing Gibbous" => "\u{1F314}",
    "Full Moon" => "\u{1F315}",
    "Waning Gibbous" => "\u{1F316}",
    "Last Quarter" => "\u{1F317}",
    "Waning Crescent" => "\u{1F318}"
  }.freeze

  def current_phase
    Rails.cache.fetch("moon_phase", expires_in: 1.hour) do
      fetch_phase_data
    end
  end

  private

  def fetch_phase_data
    uri = URI(USNO_API_URL)
    uri.query = URI.encode_www_form(
      date: Date.today.strftime("%Y-%m-%d"),
      coords: DEFAULT_COORDS
    )

    response = Net::HTTP.get(uri)
    data = JSON.parse(response).dig("properties", "data")

    phase_name = data["curphase"]
    illumination = data["fracillum"].to_i

    {
      phase_name: phase_name,
      illumination: illumination,
      phase_emoji: PHASE_EMOJIS.fetch(phase_name, "\u{1F319}"),
      cat_description: CAT_DESCRIPTIONS.fetch(phase_name, "The moon is doing something mysterious, much like a cat")
    }
  end
end
