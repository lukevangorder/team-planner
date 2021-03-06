class UsersController < ApplicationController

    def create
        user = User.new(user_params)
        if user.save
            render json: user
        else
            render json: user.errors
        end
    end

    def index
        users = User.all
        render json: users
    end

    private

    def user_params
        params.require(:user).permit(:name, :role)
    end
    
end