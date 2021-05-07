class CreateDays < ActiveRecord::Migration[4.2]
    def change
        create_table :days do |t|
            t.datetime :starts_at
            t.datetime :ends_at
        end
    end
end