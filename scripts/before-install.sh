sudo apt purge nodejs -y
sudo apt autoremove -y
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install pm2 -g