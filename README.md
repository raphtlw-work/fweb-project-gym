# Project Setup

This project uses pnpm (aliased as "pm") for package management.

## Installation

To install dependencies, run:
pm install

## Development Server

To start the development server, run:
pm run dev

## API Endpoints

- Login: POST /api/auth/login
- Signup: POST /api/auth/signup

## Authentication

The login/signup page is implemented using shadcn/ui components and the user data is stored in MongoDB.
User roles available are: member, staff, and admin.
- Admins can manage members.
- Admins manage equipments.
- Members cannot manage equipment unless they are of type staff.
