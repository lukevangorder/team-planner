class CreateEvents < ActiveRecord::Migration[4.2]
    def change
        create_table :days do |t|
            t.string :name
            t.string :info
            t.datetime :starts_at
            t.datetime :ends_at

            t.references :user, foreign_key: true
            t.references :day, foreign_key: true
        end
    end
end