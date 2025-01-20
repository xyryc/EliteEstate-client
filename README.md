# EliteEstate

EliteEstate, a Real Estate Platform, is a full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It is designed to streamline the buying, selling, and management of real estate properties, catering to three distinct user roles: User, Agent, and Admin.

## Demo

- [EliteEstate Demo](https://eliteestate.web.app/)
- [EliteEstate Backup](https://elite-estate.surge.sh/)

## Test Credentials

For testing the platform, use the following credentials:

#### Admin Account

- **Email:** `admin@gmail.com`
- **Password:** `Admin@elite123`

#### Agent Account

- **Email:** `agent@gmail.com`, `agent2@gmail.com`
- **Password:** `Agent@elite123`

#### Stripe Test Cards

- **Visa Card:** `4242424242424242`
- **Master Card:** `5555555555554444`
- **CVC:** `Any 3 digits`
- **Date:** `Any future date`

## **Features**

#### **User/Buyer Role**

- Users can view admin-approved featured properties on the homepage, along with the latest user reviews and other sections.
- Users can browse and search for properties using location, filter, and sort by price. Only admin-verified properties are displayed here.
- Users/buyers can wishlist properties and leave reviews.
- The user/buyer dashboard includes a profile page and a wishlist page, where users can make price offers to agents.
- Once an **agent** approves an offer, the buyer can make a payment using **Stripe**. Transaction information is saved and displayed on both the user/buyer and agent dashboards.
- Buyers can also view or delete their reviews.

#### **Agent Role**

- Agents can **add properties**, but the properties will not appear to users/buyers until the admin **verifies** them.
- Agents can also **update/delete** their added properties.
- If a buyer sends an offer, it will appear on the agent's **Requested Properties** page. Agents can **accept** or **reject** the offer. If an offer is **accepted**, all other offers for that property from other buyers will be automatically rejected. The buyer can then pay their offered amount using **Stripe**.
- Transaction data is saved upon successful payment. Agents can also view their total **revenue**.

#### **Admin Role**

- Admins can **verify** or **reject** properties added by agents.
- Admins can view and manage all users from the **Manage Users** page. They can promote **users** to **agent/admin** status, as well as promote **agents** to **admin** status or mark an **agent** as **fraudulent**.
- Marking an agent as fraudulent will **delete all** the properties posted by that agent. Admins can also delete any users or agents.
- Admins can view and delete any reviews added by users/buyers.
- Admins can select which properties to advertise on the homepage from the **Advertise Property** page.

## **Tech Stack**

#### **Frontend:**

- **React.js**: For building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework.
- **Material Tailwind**: Elegant UI components.
- **React Router**: Navigation and routing.
- **TanStack Query**: Data fetching and caching.
- **Firebase Authentication**: Secure user authentication.

#### **Backend:**

- **Node.js**: Server-side runtime.
- **Express.js**: RESTful APIs framework.
- **JWT**: Secure authentication.

#### **Database:**

- **MongoDB**: NoSQL database for app data.

#### **Payment Integration:**

- **Stripe API**: Secure payment processing.

#### **Deployment:**

- **Firebase & Surge**: Frontend hosting.
- **Vercel**: Backend hosting.

#### **Other Tools:**

- **ImgBB**: Image management.
- **Git & GitHub**: Version control.
- **ESLint & Prettier**: Code quality tools.
