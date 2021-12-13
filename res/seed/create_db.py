# script to generate seed database
import json
import lorem

with open('./Users.json') as users_file:
  users = json.load(users_file)

with open('./Vehicles.json') as vehicles_file:
  vehicles = json.load(vehicles_file)

with open('./Bookings.json') as bookings_file:
  bookings = json.load(bookings_file)

with open('./Notifications.json') as notifications_file:
  notifications = json.load(notifications_file)

output = {
  "users": users,
  "vehicles": vehicles,
  "Bookings": bookings,
  "notifications": notifications
}

# fixing notification message
for notification in output['notifications']:
  notification['message'] = lorem.paragraph()

output_file = open('./db.js', 'w')
output_file.write("module.exports = ")
output_file.write(json.dumps(output))
output_file.close()


