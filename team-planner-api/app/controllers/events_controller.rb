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

    def update
        event = Event.find(params[:id])
        event.name = params[:event][:name]
        event.info = params[:event][:info]
        start = params[:event][:starts_at]
        endin = params[:event][:ends_at]
        binding.pry
        event.starts_at = Time.new(start[0,4], start[5,5], start[8,8], start[11,11], start[14,14])
        event.ends_at = Time.new(endin[0,4], endin[5,5], endin[8,8], endin[11,11], endin[14,14])
        if event.save
            render json: event, status: :created
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