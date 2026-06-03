module Api
  module V1
    class MoonPhasesController < ApplicationController
      def show
        render json: MoonPhaseService.new.current_phase
      end
    end
  end
end
