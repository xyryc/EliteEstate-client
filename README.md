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

## How to Run Locally

Follow these steps to set up and run the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/xyryc/EliteEstate-client.git
   cd EliteEstate-client
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Add Firebase configuration:**

   - Create a `.env.local` file in the root directory and add your Firebase config keys:

   ```bash
    VITE_apiKey=your_api_key
    VITE_authDomain=your_auth_domain
    VITE_projectId=your_project_id
    VITE_storageBucket=your_project_bucket
    VITE_messagingSenderId=your_messaging_sender_id
    VITE_appId=your_app_id
    VITE_IMGBB_API_KEY=your_imgbb_api_key
    VITE_Payment_Gateway_PK=your_payment_gateway_public_key
    VITE_API_URL=your_backend_server_url
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
5. **Open the app in your browser:**
   ```bash
   http://localhost:5173/
   ```

## Contribution

Feel free to fork the repository, make improvements, and submit a pull request. For major changes, open an issue first to discuss the proposed changes.
