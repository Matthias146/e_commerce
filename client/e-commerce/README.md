# E-Commerce Shop

A modern full-stack e-commerce application built with Angular and Spring Boot.

The project started as a course-based e-commerce application and was heavily modernized and extended with current Angular patterns, authentication, payment processing, improved UX, responsive design and a more structured frontend architecture.

---

## Tech Stack

### Frontend

- Angular 22
- TypeScript
- Angular Signals
- Angular Signal Forms
- RxJS
- Standalone Components
- Tailwind CSS
- DaisyUI

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Spring Data REST
- Spring Security
- MySQL

### External Services

- Auth0
- Stripe

---

## Features

### Products

- Product catalog
- Product categories
- Product detail pages
- Product search
- Pagination
- Server-side sorting
- Breadcrumb navigation
- Quantity selection on product detail pages

### Shopping Cart

- Add products to cart
- Increase and decrease quantity
- Remove products
- Automatic total calculation
- Cart persistence using `sessionStorage`
- Add-to-cart feedback

### Checkout

- Contact information
- Shipping address
- Billing address
- Billing address can be copied from the shipping address
- Form validation with Angular Signal Forms
- Responsive checkout layout
- Checkout processing state
- Protection against multiple submissions

### Payments

- Stripe Payment Element
- Stripe Payment Intent
- Payment error handling
- Order creation only after successful payment
- No full credit card data is stored by the application

### Authentication

- Login and logout with Auth0
- Protected account area
- Authenticated order history
- Guest checkout is supported

### Orders

- Order creation
- Unique order tracking number
- Order confirmation page
- Order history
- Order detail page
- Ordered products with quantity and price
- Shipping address
- Billing address
- Order totals

### UX

- Responsive design
- Mobile-friendly navigation
- Loading states
- Error states
- Empty states
- Search result feedback
- Success feedback
- Mobile and desktop layouts for cart and order history

### Legal Pages

- Imprint
- Privacy Policy

---

## Frontend Architecture

The Angular application follows a feature-based structure.

```text
src/app/
├── core/
│   └── layout/
│
├── features/
│   ├── account/
│   ├── cart/
│   ├── checkout/
│   ├── legal/
│   └── product/
│
└── app.routes.ts
```

### The application uses modern Angular patterns such as:

```text
- Signals
- Computed state
- toSignal
- toObservable
- standalone components
- modern control flow with @if and @for
- feature-based routing
- reactive route handling with RxJS
- Signal Forms
```

## Order Flow

Product Catalog
↓
Product Detail
↓
Shopping Cart
↓
Checkout
↓
Stripe Payment
↓
Order Creation
↓
Order Confirmation
↓
Order History
↓
Order Detail

## Authentication Flow
### Authentication is handled with Auth0.
### Authenticated users can access:

```text
/account
/account/orders
/account/orders/:orderTrackingNumber
```
The account area is protected while checkout remains available for guest users.

## Payment Flow
Stripe is used for payment processing.

The application creates a Payment Intent in the Spring Boot backend and renders the Stripe Payment Element in the Angular frontend.

```text
Angular Checkout
↓
Spring Boot Payment Intent
↓
Stripe
↓
Payment Confirmation
↓
Order Creation
```
An order is only created after Stripe confirms a successful payment.

## Order Details
### Orders contain a snapshot of purchased products.
Each order item stores:

```text
- Product ID
- Product name
- Product image
- Unit price
- Quantity
```
This ensures that historical orders remain consistent even if product information changes later.

## Running the Project Locally
### Frontend
Navigate to the Angular project:
```text
cd client/e-commerce
```
Install dependencies:
```text
npm install
```

Start the Angular development server:
```text
ng serve
```
The frontend is available at:
```text
http://localhost:4200
```

### Backend
Navigate to the Spring Boot project and start the application.

The backend is available at:
```text
http://localhost:8080
```
### Database
The backend uses MySQL.
The database contains entities for:
```text
- Products
- Product categories
- Customers
- Orders
- Order items
- Addresses
```
Database connection settings are configured in the Spring Boot application configuration.

### Configuration
The project requires configuration for:
```text
- MySQL
- Auth0
- Stripe
```
Sensitive values such as:
```text
- database passwords
- Stripe secret keys
- Auth0 secrets
```
should never be committed to the repository.

### Stripe Test Mode
The application is intended to run with Stripe Test Mode during development.

Stripe test cards can be used to simulate successful or failed payments.

### Responsive Design
The application is optimized for both desktop and mobile devices.

Responsive layouts are implemented for:
```text
- Header
- Navigation
- Search
- Product catalog
- Product details
- Cart
- Checkout
- Order history
- Order details
- Order confirmation
```

### Error Handling
The application provides dedicated UI states for:
```text
- Product loading
- Product loading errors
- Order loading
- Order loading errors
- Checkout errors
- Stripe payment errors
- Empty product searches
```

### Project Background
The initial idea for this project was based on an older e-commerce course.

Instead of keeping the original implementation, the project was significantly modernized and extended.

Major changes include:
```text
- migration to modern Angular
- Angular Signals
- Signal Forms
- standalone components
- modern Angular routing
- responsive Tailwind-based UI
- Auth0 authentication
- Stripe payment integration
- improved cart handling
- server-side sorting
- improved error handling
- order history
- order detail pages
- modernized project structure
```
The goal was not only to reproduce the original course project, but to rebuild it using current Angular and Spring Boot development practices.

### Current Status
The core shop functionality is complete.

Implemented areas include:
```text
- product catalog
- search
- categories
- pagination
- sorting
- cart
- checkout
- payments
- authentication
- orders
- order history
- order details
- responsive design
- legal pages
```
Possible future improvements include:
```text
- stronger backend authorization for order ownership
- global API error handling
- additional backend validation
- automated testing
- CI/CD
- deployment
- additional security improvements
```
### Author
Matthias Hammelehle

Website:
https://e-commerce.matthias-hammelehle.dev
