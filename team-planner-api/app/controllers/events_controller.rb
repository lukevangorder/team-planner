class EventsController < ApplicationController

    def create
        event = Event.new(event_params)
        if event.save
            render json: event
        else
            render json: event.errors
        end
    end

    def index
        events = Event.all
        render json: events
    end

    def show #shows all by user
        events = Event.where(user_id: params[:id])
        render json: events
    end

    private

    def event_params
        params.require(:event).permit(:name, :info, :starts_at, :ends_at, :user)
    end
    
end