# script to generate seed database
import json
import lorem
import random
from pymongo import MongoClient

load_frontend = False 
load_mongodb = True
mongodb_name = 'mongo-test2'


car_images = [
  'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/909907/pexels-photo-909907.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/1164778/pexels-photo-1164778.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/810357/pexels-photo-810357.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/1637859/pexels-photo-1637859.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/100656/pexels-photo-100656.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'  ,
  'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
]


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
  "bookings": bookings,
  "notifications": notifications
}

for vehicle in output['vehicles']:
  vehicle['img'] = random.choice(car_images)
  vehicle['description'] = lorem.paragraph() if (random.uniform(0,1) > 0.3) else ''

# fixing notification message
for notification in output['notifications']:
  notification['message'] = lorem.paragraph()

# fix booking to
for booking in output['bookings']:
  booking['to'] = booking['to'].replace('.000Z','Z')

if (load_frontend):
  output_file = open('../../frontend/data/db.js', 'w')
  output_file.write("module.exports = ")
  output_file.write(json.dumps(output))
  output_file.close()

if (load_mongodb):
  client = MongoClient('mongodb+srv://idanhahn:idan1980@cluster0.bpwoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  db = client[mongodb_name]
  for collection in output:
    db[collection].insert_many(output[collection])

