# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails dbseed command (or created alongside the database with dbsetup).
#
# Examples
#
#   movies = Movie.create([{ :name 'Star Wars' }=> , { :name 'Lord of the Rings' }])
#   Character.create(:name 'Luke'=> , movie movies.first)

User.create(:name => "David Crosby", :role => "Team Leader")
User.create(:name => "Stephen Stills", :role => "Technical Lead")
User.create(:name => "Grahan Nash", :role => "Design Lead")

#Week of May 10 - 16
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Dave from Accounting", :starts_at => Time.new(2021, 5, 10, 14, 00, 00), :ends_at => Time.new(2021, 5, 10, 15, 00, 00), :user_id => 1)
Event.create(:name => "Budget Review", :info => "Meet with Mark from Accounting to review the monthly budget", :starts_at => Time.new(2021, 5, 10, 16, 00, 00), :ends_at => Time.new(2021, 5, 10, 18, 00, 00), :user_id => 1)
Event.create(:name => "Lunch with Lucy", :info => "I forgot our last 3 anniversaries, don't forget this time!!!", :starts_at => Time.new(2021, 5, 11, 12, 00, 00), :ends_at => Time.new(2021, 5, 11, 12, 45, 00), :user_id => 1)
Event.create(:name => "Senior Staff Awards Banquet", :info => "All senior staff are invited to this mandatory dinner to see who become crowned team member of the month!", :starts_at => Time.new(2021, 5, 15, 18, 00, 00), :ends_at => Time.new(2021, 5, 15, 22, 00, 00), :user_id => 1)
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Dave from Accounting", :starts_at => Time.new(2021, 5, 10, 14, 00, 00), :ends_at => Time.new(2021, 5, 10, 15, 00, 00), :user_id => 2)
Event.create(:name => "New Candidate Interviews", :info => "Meet with Bryan in HR", :starts_at => Time.new(2021, 5, 14, 10, 30, 00), :ends_at => Time.new(2021, 5, 14, 14, 45, 00), :user_id => 2)
Event.create(:name => "Satuday Morning Cartoons", :info => "HaHa, that cat is never getting that mouse! Classic!", :starts_at => Time.new(2021, 5, 15, 9, 00, 00), :ends_at => Time.new(2021, 5, 15, 11, 00, 00), :user_id => 2)
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Dave from Accounting", :starts_at => Time.new(2021, 5, 10, 14, 00, 00), :ends_at => Time.new(2021, 5, 10, 15, 00, 00), :user_id => 3)
Event.create(:name => "Meet with Carla", :info => "Carla has a new proposal for the project she wants us to check out", :starts_at => Time.new(2021, 5, 13, 12, 00, 00), :ends_at => Time.new(2021, 5, 13, 13, 00, 00), :user_id => 3)
Event.create(:name => "Weekend Camping trip", :info => "Meeting at Alum Creek Campground. Note to self: Bring s'mores", :starts_at => Time.new(2021, 5, 13, 16, 00, 00), :ends_at => Time.new(2021, 5, 15, 10, 00, 00), :user_id => 3) #Multi Day event

#Week of May 17 - 23
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Mark from Accounting", :starts_at => Time.new(2021, 5, 17, 14, 00, 00), :ends_at => Time.new(2021, 5, 17, 15, 00, 00), :user_id => 1)
Event.create(:name => "Pizza Party", :info => "Pizza party for our hard working staff!", :starts_at => Time.new(2021, 5, 19, 02, 00, 00), :ends_at => Time.new(2021, 5, 19, 03, 00, 00), :user_id => 1)
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Mark from Accounting", :starts_at => Time.new(2021, 5, 17, 14, 00, 00), :ends_at => Time.new(2021, 5, 17, 15, 00, 00), :user_id => 2)
Event.create(:name => "Pizza Party", :info => "Pizza party for our hard working staff!", :starts_at => Time.new(2021, 5, 19, 02, 00, 00), :ends_at => Time.new(2021, 5, 19, 03, 00, 00), :user_id => 2)
Event.create(:name => "Team Meeting", :info => "Weekly Staff Meeting featuring gueast speaker Mark from Accounting", :starts_at => Time.new(2021, 5, 17, 14, 00, 00), :ends_at => Time.new(2021, 5, 17, 15, 00, 00), :user_id => 3)