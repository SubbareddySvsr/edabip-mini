resource "aws_vpc" "edabip_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "edabip-vpc"
    Project     = "EDABIP"
    Environment = "dev"
  }
}

resource "aws_internet_gateway" "edabip_igw" {
  vpc_id = aws_vpc.edabip_vpc.id

  tags = {
    Name    = "edabip-igw"
    Project = "EDABIP"
  }
}

# -------------------------
# Public Subnets
# -------------------------

resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.edabip_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "ap-south-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "edabip-public-a"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.edabip_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "ap-south-1b"
  map_public_ip_on_launch = true

  tags = {
    Name = "edabip-public-b"
  }
}

# -------------------------
# Private Subnets
# -------------------------

resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.edabip_vpc.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = "ap-south-1a"

  tags = {
    Name = "edabip-private-a"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.edabip_vpc.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = "ap-south-1b"

  tags = {
    Name = "edabip-private-b"
  }
}

# -------------------------
# Public Route Table
# -------------------------

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.edabip_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.edabip_igw.id
  }

  tags = {
    Name = "edabip-public-rt"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# -------------------------
# Private Route Table
# -------------------------

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.edabip_vpc.id

  tags = {
    Name = "edabip-private-rt"
  }
}

resource "aws_route_table_association" "private_a" {
  subnet_id      = aws_subnet.private_a.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_b" {
  subnet_id      = aws_subnet.private_b.id
  route_table_id = aws_route_table.private.id
}