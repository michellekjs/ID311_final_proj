rm server.tar.gz
rm client.tar.gz
tar -czvf server.tar.gz server
tar -czvf client.tar.gz client
scp -i id311-project-aws-ec2.pem server.tar.gz ec2-user@52.79.235.185:
scp -i id311-project-aws-ec2.pem client.tar.gz ec2-user@52.79.235.185:
echo "upload completed"