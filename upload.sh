rm server.tar.gz
tar -czvf server.tar.gz server
scp -i id311-project-aws-ec2.pem server.tar.gz ec2-user@52.79.235.185:
echo "upload completed"