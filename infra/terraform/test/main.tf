terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project = "transitgo-training"
  env     = "test"
}

output "placeholder" {
  value = "Terraform skeleton for ${local.project}-${local.env} in ${var.aws_region}"
}
