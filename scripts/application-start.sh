
#!/bin/bash
# Stop all servers and start the server
cd /home/ubuntu/Sites/admin-portal
sudo npm start
sudo pm2 start npm --name "admin-portal" -- start
sudo pm2 startup
sudo pm2 save
sudo pm2 restart all