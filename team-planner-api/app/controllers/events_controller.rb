class EventsController < ApplicationController

    def create
        event = Event.new(event_params)
        event.user = User.find(params[:user_id]);
        if event.save
            render json: event, except: [:id], status: :created
        else
            render json: event, status: :bad_request
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
        params.require(:event).permit(:name, :info, :starts_at, :ends_at, :user_id)
    end
    
end