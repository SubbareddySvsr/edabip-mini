data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }
}

resource "aws_instance" "jenkins" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.small"
  key_name      = "edabip-jenkins-key"

  subnet_id              = aws_subnet.public_a.id
  vpc_security_group_ids = [aws_security_group.jenkins.id]

  associate_public_ip_address = true

  tags = {
    Name        = "edabip-jenkins"
    Project     = "EDABIP"
    Environment = "dev"
    Role        = "Jenkins"
  }
}