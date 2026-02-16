import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileVideo,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Helmet } from 'react-helmet-async'
import OptimizedImage from '@/components/OptimizedImage'

type ProjectMediaType = 'image' | 'video' | 'document'

interface ProjectMedia {
  type: ProjectMediaType
  url: string
  caption?: string
  thumbnail?: string
}

interface ProjectData {
  id: string
  title: string
  description: string
  coverImage: string
  media: ProjectMedia[]
  client: string
  date: string
  technologies: string[]
  features?: string[]
  featureSections?: Array<{
    title: string
    items: string[]
  }>
  demoUrl?: string
  githubUrl?: string
}

const projects: Record<string, ProjectData> = {
  'yesser-recruitment': {
    id: 'yesser-recruitment',
    title: 'Yesser – Recruitment Agency ERP System',
    description:
      'Yesser is a comprehensive enterprise ERP system purpose-built for recruitment agencies in Saudi Arabia. It manages the complete recruitment lifecycle—from client onboarding and visa processing to worker contracts, sponsorship transfers (Kafala), housing, waivers, refund management, and full financial operations. The platform supports bilingual Arabic/English operations with full RTL layout, integrates with Musaned (Saudi government recruitment platform), and delivers real-time analytics dashboards with advanced data grid components for every business domain.',
    coverImage: '/assets/Yesser/Yesser%20Logo.png',
    media: [
      {
        type: 'image',
        url: '/assets/Yesser/Statistcs%201.png',
        caption:
          'Recruitment dashboard with analytics charts and contract statistics',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Statistcs%202.png',
        caption:
          'Worker statistics, waiver trends, and rent analytics overview',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Statistcs%203.png',
        caption: 'Customer distribution charts and refund statistics',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Statistcs%204.png',
        caption: 'Surety transfer analytics and complaints tracking dashboard',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Login%20Screen.png',
        caption:
          'Bilingual login with secure authentication and password recovery',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Clients%20Screens.png',
        caption: 'Customer management table with advanced AG Grid filtration',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Client%20Form.png',
        caption:
          'Comprehensive customer form with personal, passport, and address data',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Client%20Details.png',
        caption:
          'Customer details with contracts, identity info, and financial status',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Worker%20Screen.png',
        caption:
          'Worker management with CV linking, availability, and status tracking',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Worker%20Form.png',
        caption:
          'Worker form with personal data, passport, skills, and experience sections',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Worker%20Details.png',
        caption:
          'Worker detail view with education, insurance, and relative information',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Rents%20Screen.png',
        caption:
          'Rental contracts management with procedures and financial details',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Rent%20Form.png',
        caption:
          'Rent contract creation with period, pricing, and worker assignment',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Housing%20Screen.png',
        caption: 'Worker housing management and accommodation tracking',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Housing%20Form.png',
        caption: 'Housing assignment form with capacity and worker allocation',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Financial%20Receipts%20Screen.png',
        caption:
          'Financial receipts table with payment destinations and amounts',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Receipts%20Screen.png',
        caption: 'Receipts management with sales invoices and tax breakdown',
      },
      {
        type: 'image',
        url: '/assets/Yesser/Record%20Options.png',
        caption: 'Record context menu with print, export, and action options',
      },
      {
        type: 'image',
        url: '/assets/Yesser/System%20Users%20Screen.png',
        caption: 'System users management with role-based access control',
      },
      {
        type: 'image',
        url: '/assets/Yesser/User%20Details%20Roles.png',
        caption:
          'User details with granular role permissions and module access',
      },
      {
        type: 'image',
        url: '/assets/Yesser/User%20Notification.png',
        caption:
          'Real-time Firebase notification center with section filtering',
      },
    ],
    client: 'Yesser Recruitment',
    date: '2023',
    technologies: [
      'Angular',
      'TypeScript',
      'SCSS',
      'AG Grid',
      'NgRx Store',
      'Angular Material',
      'RxJS',
      'NgxTranslate (AR/EN)',
      'ASP.NET Core',
      'C#',
      'Entity Framework',
      'SQL Server',
      'Firebase Push Notifications',
      'Linux Server',
      'CKEditor',
      'Chart.js',
    ],
    featureSections: [
      {
        title: 'Recruitment & Contract Management',
        items: [
          'Full recruitment contract lifecycle: create, update, link procedures, and track warranty periods',
          'Musaned integration: contract numbers, request types, and government fee tracking',
          'Contract procedures with automated SMS and email notifications on status changes',
          'Resume/CV linking: match workers to contracts by experience, religion, country, and external office',
          'Warranty tracking: expiration alerts, trial periods, and contract extension management',
          'Stepper-based contract forms: customer identification → contract details → external office → financials',
        ],
      },
      {
        title: 'Client, Worker & Operations Management',
        items: [
          'Complete customer management: personal data, passport, identity, national address, and work info',
          'Customer types: individuals and businesses with VIP classification and blocking capabilities',
          'Worker management: CV uploads, personal photos, visa/border numbers, residence, passport, and skills',
          'Sponsorship transfer (Kafala): old/new sponsor tracking, authorization status, and financial amounts',
          'Waiver requests: worker-for-waiver and waiver-for-worker with specifications and conditions',
          'Worker rental: contracts, period management, procedures, and financial side panels',
          'Housing/accommodation: worker housing assignment, capacity management, and tracking',
          'Refund management: return worker during contract period with procedure logging',
          'Electronic authorization: delegations with office, number, and Musaned date tracking',
        ],
      },
      {
        title: 'Financial Management & Analytics',
        items: [
          'Sales and purchases: invoice generation, bill tables, amounts with VAT/tax calculation',
          'Receipts and bills of exchange: payment destinations, document numbering, and side types',
          'Financial movements: transaction tracking with storage/safe management',
          'Financial settings: banks, storage, devices, networks, and expense types',
          'Dashboard analytics: Chart.js-powered charts for recruitment, workers, customers, waivers, rent, refunds, and surety transfers',
          'Date-filtered statistics: this month, last 30 days, last week, all time, with department filtering',
          'Print and export: customer contracts, worker contracts, delegation documents, vouchers, and invoices',
        ],
      },
      {
        title: 'Platform Architecture & Engineering',
        items: [
          'Reusable AG Grid template system: shared filter strategy with text, date, range, radio, and select renderers—reducing development time by 30%',
          'NgRx Store for state management: enhanced code maintainability by 60% and scalability by 40%',
          'Full RTL/LTR bilingual support: Arabic and English with NgxTranslate and dynamic direction switching',
          'Role-based access control: granular permissions per module (canView, canAdd, canUpdate, canDelete) with admin overrides',
          'Modular Angular architecture: 15+ lazy-loaded feature modules for optimal performance',
          'Dynamic form validation: smart validators for Arabic/English text, numbers, and conditional fields',
          'Firebase push notifications: real-time alerts with section-based filtering and read tracking',
          '90% unit test coverage, decreasing bugs by 30%',
          'Agile delivery methodology with 90% on-time release success rate',
        ],
      },
    ],
    githubUrl: 'https://github.com/MTA-coder/yesser-recruitment',
    demoUrl: 'https://8264-58682.el-alt.com/',
  },
  'smart-race-application': {
    id: 'smart-race-application',
    title: 'Smart Race Application – Camel Race Association',
    description:
      'Smart Race Application is an enterprise-grade mobile and internal management platform built for the UAE Camel Race Association. It digitizes the full camel racing lifecycle—from registration and payments to approvals, race participation, and reporting—while enabling secure transactions and real-time communication across all roles.',
    coverImage: '/assets/CRA/Cover%20Image.jpg',
    media: [
      {
        type: 'image',
        url: '/assets/CRA/Cover%20Image.jpg',
        caption: 'Enterprise overview and digital ecosystem entry point',
      },
      {
        type: 'image',
        url: '/assets/CRA/login.jpg',
        caption: 'Secure login and role-based access entry',
      },
      {
        type: 'image',
        url: '/assets/CRA/First%20Page.jpg',
        caption: 'Participant home with quick actions and stats',
      },
      {
        type: 'image',
        url: '/assets/CRA/sidebar.jpg',
        caption: 'Navigation and multi-role access panels',
      },
      {
        type: 'image',
        url: '/assets/CRA/sidebar%203.jpg',
        caption: 'Administration and governance shortcuts',
      },
      {
        type: 'image',
        url: '/assets/CRA/requests.jpg',
        caption: 'Service requests with approval workflow',
      },
      {
        type: 'image',
        url: '/assets/CRA/information%20board.jpg',
        caption: 'Events, races, rounds, and prize visibility',
      },
      {
        type: 'image',
        url: '/assets/CRA/notification.jpg',
        caption: 'Real-time notifications and alerts',
      },
      {
        type: 'image',
        url: '/assets/CRA/Receipts.jpg',
        caption: 'Receipts and payment history',
      },
      {
        type: 'image',
        url: '/assets/CRA/reset%20password.jpg',
        caption: 'Secure account recovery flow',
      },
    ],
    client: 'UAE Camel Race Association',
    date: '2024',
    technologies: [
      'Flutter',
      'ASP.NET Core',
      'C#',
      'SQL Server (SSMS)',
      'REST APIs',
      'PayTabs',
      'Firebase Push Notifications',
      'SMS Gateway',
      'SMTP Email',
      'Windows Server',
      'IIS',
    ],
    featureSections: [
      {
        title: 'Platform Capabilities',
        items: [
          'Camel management: registration, status, transfers, microchip merge, and identity updates',
          'Events & races: rounds, prizes, visibility, archives, and participation history',
          'Role-based access: participant, trainer, sheikh, and internal administration',
          'Secure payments: online payments and bank transfer attachments',
          'Receipts and reports with share options across social media',
          'Service ratings and feedback for continuous improvement',
        ],
      },
      {
        title: 'Security, Approvals & Workflow',
        items: [
          'OTP verification for sensitive actions and ownership transfer',
          'Approval lifecycle: request → payment → review → approval/rejection',
          'Payment retries, status synchronization, and receipt delivery',
          'Multi-account linking with controlled permissions',
        ],
      },
      {
        title: 'Engineering Impact & Delivery',
        items: [
          'Enterprise messaging service for email, SMS, and push notifications with retry logic',
          'API-driven architecture supporting mobile and internal systems',
          'Staging + production environments with load-balancing readiness',
          'Operational analytics: race, camel, financial, and service reports',
        ],
      },
      {
        title: 'Business Value',
        items: [
          'Reduced manual paperwork and faster approvals',
          'Higher transparency for participants and administrators',
          'Secure financial workflows with traceable history',
          'Scalable foundation for federation-wide growth',
        ],
      },
    ],
  },
  restuo: {
    id: 'restuo',
    title: 'Restuo – Smart Restaurant SaaS Platform',
    description:
      'Restuo is a cloud-based SaaS ecosystem that digitizes restaurant operations end-to-end—from menu and orders to kitchen workflow, cashier, delivery, analytics, and customer loyalty. It is built for Germany’s compliance needs with configurable VAT rules, structured reporting, and multi-channel ordering experiences.',
    coverImage: '/assets/Restu/Cover%20Hero%20Section.png',
    media: [
      {
        type: 'image',
        url: '/assets/Restu/Cover%20Hero%20Section.png',
        caption: 'Restaurant landing experience and conversion-focused layout',
      },
      {
        type: 'image',
        url: '/assets/Restu/Restaurant%20About%20us.jpg',
        caption: 'Brand story and restaurant information section',
      },
      {
        type: 'video',
        url: '/assets/Restu/Order%20Page.mp4',
        thumbnail: '/assets/Restu/Restaurant%20Page.jpg',
        caption: 'Ordering flow with status tracking and tax calculation',
      },
      {
        type: 'video',
        url: '/assets/Restu/Cooker%20System.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-33.jpg',
        caption: 'Smart cooker system with chef assignment logic',
      },
      {
        type: 'video',
        url: '/assets/Restu/Cashir%20Screen.mp4',
        thumbnail: '/assets/Restu/Invoice%20Print.jpg',
        caption: 'Cashier workflow with POS operations',
      },
      {
        type: 'image',
        url: '/assets/Restu/Invoice%20Print.jpg',
        caption: 'Invoice generation and print-ready output',
      },
      {
        type: 'image',
        url: '/assets/Restu/Invoice%20Print%20Cachir.jpg',
        caption: 'Cashier invoice print and customer receipt flow',
      },
      {
        type: 'video',
        url: '/assets/Restu/Login%20&%20Category%20Screen.mp4',
        thumbnail: '/assets/Restu/photo_2022-11-02_19-46-07.jpg',
        caption: 'Login and category navigation with role-based access',
      },
      {
        type: 'video',
        url: '/assets/Restu/Meal%20Page.mp4',
        thumbnail: '/assets/Restu/photo_2022-11-02_19-45-34.jpg',
        caption: 'Meal details, images, and customization options',
      },
      {
        type: 'video',
        url: '/assets/Restu/Ingredient%20Multiple%20Categories.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-35.jpg',
        caption: 'Ingredient management and multi-category tagging',
      },
      {
        type: 'video',
        url: '/assets/Restu/Discount%20Form%20Wizard.mp4',
        thumbnail: '/assets/Restu/photo_2023-03-13_02-37-16.jpg',
        caption: 'Discount and offer configuration wizard',
      },
      {
        type: 'video',
        url: '/assets/Restu/Coupon%20Page.mp4',
        thumbnail: '/assets/Restu/restuarnt%20intresets.jpg',
        caption: 'Coupon creation and VIP targeting',
      },
      {
        type: 'video',
        url: '/assets/Restu/Offer%20Page.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-34.jpg',
        caption: 'Offer management with meal-based selections',
      },
      {
        type: 'video',
        url: '/assets/Restu/Offer%20Animation.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-33.jpg',
        caption: 'Promotion animations and engagement elements',
      },
      {
        type: 'video',
        url: '/assets/Restu/Meal%20Reviews.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-35.jpg',
        caption: 'Ratings and review system with star filtering',
      },
      {
        type: 'video',
        url: '/assets/Restu/Profile%20Page.mp4',
        thumbnail: '/assets/Restu/restu%20authentication%20mobile.jpg',
        caption: 'Customer profile and account management',
      },
      {
        type: 'video',
        url: '/assets/Restu/Employee.mp4',
        thumbnail: '/assets/Restu/photo_2022-12-06_14-43-34.jpg',
        caption: 'Employee roles and permissions management',
      },
      {
        type: 'video',
        url: '/assets/Restu/restu%20website%20big%20screen%20view.mp4',
        thumbnail: '/assets/Restu/Restaurant%20Page.jpg',
        caption: 'Large-screen restaurant display mode',
      },
    ],
    client: 'Restuo',
    date: '2024',
    technologies: [
      'Angular',
      'HTML5',
      'SCSS',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'REST APIs',
      'Linux',
    ],
    featureSections: [
      {
        title: 'Application Suite (12 Modules)',
        items: [
          'Menu & Catalog: products, categories, meal details, images, publish/unpublish',
          'Ingredient Customization: add‑ons, spice levels, preparation time rules',
          'Discounts & Promotions: coupons, VIP coupons, gift cards, offer types',
          'Ordering Channels: indoor, QR table, outdoor web/app, takeaway, delivery',
          'Payments: PayPal, Stripe, POS, cash, refunds, pay‑from‑table',
          'Smart Cooker: CBR-based meal assignment and multi‑chef synchronization',
          'Cashier & Invoice: POS orders, printing, email invoices, refunds',
          'Waiting Screen: preparing vs ready orders in real time',
          'Admin Dashboard: products, services, offers, orders, settings',
          'Restaurant Info: branding, hours, maps, social links, terms upload',
          'Customer Experience: ratings, feedback, VIP and loyalty segmentation',
          'Reporting & Accounting: VAT rules, Excel/PDF exports, filters',
        ],
      },
      {
        title: 'Operational Capabilities',
        items: [
          'Real-time order tracking with tax calculation per order',
          'Role-based access for dashboard, cashier, kitchen, and cooker screens',
          'Real-time Pusher updates for cooker system to deliver meals on time',
          'QR menu flow: scan → browse → order → pay at table',
          'Smart filtering for VIP targeting based on spend, time, and orders',
          'Order analytics by source (indoor, outdoor, app, delivery)',
          'Germany-ready VAT configuration and accountant-ready exports',
        ],
      },
      {
        title: 'Engineering Impact',
        items: [
          'Unified ecosystem connecting ordering, kitchen logic, cashier, and analytics',
          'Case-based reasoning workflow to prevent meal quality loss',
          'API-first architecture with scalable SaaS-ready structure',
          'Clean separation of modules for multi-restaurant expansion',
          'Secure authentication and validation across customer and admin flows',
        ],
      },
    ],
  },
  'nova-tech': {
    id: 'nova-tech',
    title: 'We Nova-Tech – Dynamic Company Platform & Smart Landing Ecosystem',
    description:
      'We Nova-Tech is a fully dynamic, enterprise-style company platform combining a high-performance landing experience with a powerful administration dashboard. It demonstrates API-driven content control, scalable architecture, and modern digital branding designed for real-world production use.',
    coverImage: '/assets/nova-tech/NovaTech%20Landing%20Page.png',
    media: [
      {
        type: 'image',
        url: '/assets/nova-tech/NovaTech%20Landing%20Page.png',
        caption: 'Landing page hero with modern company branding',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Landing%20Page%20Services.png',
        caption: 'Dynamic services section rendered from APIs',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Landing%20Page%20Work%20Section.png',
        caption: 'Portfolio showcase optimized for hiring and sales',
      },
      {
        type: 'image',
        url:
          '/assets/nova-tech/Landing%20Page%20Nova%20Tech%20Technologies.png',
        caption: 'Technology stack showcase for credibility and clarity',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Landing%20Page%20About%20Us.png',
        caption: 'Company information and about sections',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Landing%20Page%20Who%20we%20are.png',
        caption: 'Storytelling section with structured content',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Dashboard%20Nova%20Tech.png',
        caption: 'Admin dashboard overview with full content control',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Dashboard%20Services.png',
        caption: 'Services management with CRUD operations',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Dasboard%20Service%20Form.png',
        caption: 'Service details and feature highlights editor',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Dashboard%20Information.png',
        caption: 'Company information and branding management',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Dashboard%20Form.png',
        caption: 'Dynamic forms with validation and secure handling',
      },
      {
        type: 'image',
        url: '/assets/nova-tech/Poicy%20and%20Terms.png',
        caption: 'Policy and terms content management',
      },
    ],
    client: 'We Nova-Tech',
    date: '2024',
    technologies: [
      'Angular',
      'HTML5',
      'SCSS',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'REST APIs',
      'Vercel',
      'IONOS (Germany)',
      'Linux',
    ],
    featureSections: [
      {
        title: 'Platform Capabilities & Experience',
        items: [
          'Fully dynamic content controlled via an admin dashboard',
          'Company branding, logo, and information management',
          'Services and service details CRUD with feature highlights',
          'Portfolio management across web, mobile, and applications',
          'Technology stack showcase for credibility and clarity',
          'Dynamic section ordering and visibility control',
          'SEO-friendly content structure and performance-optimized rendering',
          'Modular layout ready for future expansion',
        ],
      },
      {
        title: 'Engineering Impact & Delivery',
        items: [
          'API-first architecture separating frontend and backend',
          'Reusable component strategy and clean service layers',
          'Optimized API calls with lazy rendering and lightweight DOM flow',
          'Authentication, validation, and secure data handling',
          'Scalable backend structure following REST standards',
          'Production deployment across Vercel and IONOS infrastructure',
          'Ownership across architecture, build, deployment, and optimization',
        ],
      },
      {
        title: 'Business Value Delivered',
        items: [
          'Faster marketing updates without developer dependency',
          'Professional company branding structure for credibility',
          'Reduced operational costs through dashboard automation',
          'Scalable foundation for multi-company or SaaS evolution',
        ],
      },
    ],
    demoUrl: 'https://galaxy-pi-mauve.vercel.app',
  },
  'issan-mosque-dmk': {
    id: 'issan-mosque-dmk',
    title: 'Ihssan Mosque DMK – Donation & Services Website',
    description:
      'Ihssan Mosque DMK is a fully dynamic, multilingual platform built to streamline online donations and educational program registrations for a mosque in Germany. It supports direct and on‑behalf donations, multiple payment gateways, IBAN payments for education programs, real‑time statistics, and SEO‑optimized content that works flawlessly across mobile, web, laptops, and flat screens.',
    coverImage: '/assets/ihssan-dmk/Hero%20section.jpg',
    media: [
      {
        type: 'image',
        url: '/assets/ihssan-dmk/Hero%20section.jpg',
        caption: 'Hero section with donation focus and clear call-to-action',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20donation%20options.jpg',
        caption: 'Donation flow with multiple payment gateways',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20payment%20methods.jpg',
        caption: 'Payment methods including card wallets and local options',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20form%20registeration%20students.jpg',
        caption: 'Student registration form with IBAN payments',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20registeration%20students.jpg',
        caption: 'Education program enrollment and scheduling',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20registeration%20students%202.jpg',
        caption: 'Registration workflow details and confirmations',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20services.jpg',
        caption: 'Services section managed through the admin dashboard',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/section%20donation%20details.jpg',
        caption: 'Donation details and summary view',
      },
      {
        type: 'image',
        url: '/assets/ihssan-dmk/ihssan%20dashboard%20login.png',
        caption: 'Admin dashboard secure login',
      },
    ],
    client: 'Ihssan Mosque DMK',
    date: '2024',
    technologies: [
      'Angular',
      'HTML',
      'SCSS',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'REST APIs',
      'IONOS (Germany)',
    ],
    featureSections: [
      {
        title: 'Donor Experience & Platform Capabilities',
        items: [
          'Donation system: direct or on‑behalf giving',
          'Multiple payment gateways: PayPal, Google Pay, Apple Pay, Visa/MasterCard, Sofort, Klarna',
          'Automated email confirmations for successful donations',
          'Multilingual support (AR, DE) with dynamic API content',
          'Educational program registration with day selection and IBAN payments',
          'Real‑time statistics and total funds tracking',
          'Quranic verses slider to enhance engagement',
          'About page with news and updates (image, title, description)',
          'Fully responsive UI for mobile, web, laptops, and flat screens',
          'SEO optimization with Google Ads integration and visitor analytics',
        ],
      },
      {
        title: 'Engineering Leadership & Delivery Impact',
        items: [
          'Admin dashboard: login/logout, profile update, password change, and logo management',
          'CRUD management for sliders, services, donations, and About‑Us content',
          'End‑to‑end REST API design and MySQL data modeling',
          'Secure authorization layer for admin access',
          'Payment gateway integration and validation flows',
          'Performance enhancements: lazy loading, skeleton image loaders, SEO tuning',
          'Deployment of frontend, backend, and database on IONOS Germany servers',
        ],
      },
    ],
  },
  'pro-decor': {
    id: 'pro-decor',
    title: 'Pro Decor – VIP Dynamic Landing Page',
    description:
      'Pro Decor is a fully dynamic, multilingual landing page crafted for VIP customers in interior design and home improvement. Built on REST APIs, it delivers seamless content management across Arabic, English, Dutch, and Finnish, with an elegant experience optimized for web, mobile, and flat screens.',
    coverImage: '/assets/pro-decor/Hero Section ProDecor.jpg',
    media: [
      {
        type: 'image',
        url: '/assets/pro-decor/Hero Section ProDecor.jpg',
        caption: 'Hero section highlighting premium services',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Section Services ProDecor.jpg',
        caption: 'Services section with image, name, and description',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Section History ProDecor.jpg',
        caption: 'Company history and “Who We Are” storytelling',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/About Us.jpg',
        caption: 'About us section and brand narrative',
      },
      {
        type: 'image',
        url: '/assets/pro-decor/Dashboard Services CRUD ProDecor.jpg',
        caption: 'Admin dashboard for multilingual content control',
      },
    ],
    client: 'Pro Decor',
    date: '2024',
    technologies: [
      'Angular',
      'HTML',
      'SCSS',
      'TypeScript',
      'Laravel',
      'PHP',
      'MySQL',
      'REST APIs',
      'Node.js',
      'Linux (IONOS Germany)',
    ],
    featureSections: [
      {
        title: 'Customer Experience & Platform Capabilities',
        items: [
          'Dynamic & multilingual content (AR, EN, DU, FI)',
          'Image & video sliders to showcase services and projects',
          'Services section with image, name, and description',
          'Portfolio gallery with high-quality imagery',
          'Embedded YouTube videos for engagement',
          'News & offers section with image, name, and description',
          'Company history and “Who We Are” storytelling',
          'Meet the Team introductions',
          'Contact form for service requests via email',
          'Integrated Google Maps location',
          'Customer reviews & testimonials',
          'Admin dashboard with login for full content control',
        ],
      },
      {
        title: 'Engineering Impact & Performance Leadership',
        items: [
          'Performance optimizations: lazy loading, gzip compression, CSS minification',
          'Results: FCP 2.65s → 400ms, LCP 8.24s → 1.63s, score 15% → 97%',
          'Role: Frontend UI/UX in Angular (SCSS, TypeScript)',
          'Role: Backend REST APIs in Laravel & MySQL',
          'Role: API & dashboard validations',
          'Role: Hosting & deployment on IONOS Germany server',
        ],
      },
    ],
  },
  correspondence: {
    id: 'correspondence',
    title: 'Automated Correspondence System',
    description:
      'A comprehensive correspondence system developed for government employees that enhances communication efficiency by 40%. This system streamlines document workflows, automates routing, and provides intelligent search capabilities.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        caption: 'Document management dashboard',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
        caption: 'Correspondence overview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        caption: 'User permission management',
      },
    ],
    client: 'Government Agency',
    date: 'January 2024',
    technologies: [
      'Angular',
      'ASP.NET Core',
      'SQL Server',
      'Entity Framework',
      'AI Integration',
      'UAE PASS',
    ],
    features: [
      'Document tracking and management',
      'Automated workflow routing',
      'Digital signatures with UAE PASS integration',
      'Role-based access control',
      'Advanced search with AI capabilities',
      'Comprehensive audit logging',
      'Real-time notifications',
    ],
  },
  moei: {
    id: 'moei',
    title: 'Ministry of Energy Industry System',
    description:
      'Licensing system for the Ministry of Energy and Industry with AI-driven chatbots and integrated authentication via UAE PASS. This system reduced processing time for approvals by 30% and streamlined the licensing process for both applicants and administrators.',
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
        caption: 'Main dashboard view',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        caption: 'Application processing interface',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1518792528501-352f829886dc',
        caption: 'Chatbot interaction',
      },
    ],
    client: 'Ministry of Energy and Industry',
    date: 'October 2023',
    technologies: [
      'Angular',
      'ASP.NET Core',
      'SQL Server',
      'Entity Framework',
      'AI Chatbot',
      'UAE PASS',
      'UAE ICP',
    ],
    features: [
      'Online license application and renewal',
      'Document validation and verification',
      'AI-powered application review assistance',
      'Integrated payment gateway',
      'Automated notifications',
      'Multi-level approval workflow',
      'Comprehensive reporting dashboard',
    ],
    demoUrl: '#',
  },
  restaurant: {
    id: 'restaurant',
    title: 'Restaurant SaaS Platform',
    description:
      'An ecommerce SaaS platform for indoor and outdoor restaurant operations with real-time kitchen tracking system. This solution boosted meal delivery efficiency by 80% through real-time monitoring and improved coordination between front-of-house and kitchen staff.',
    coverImage: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        caption: 'Main dashboard overview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9',
        caption: 'Kitchen display system',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7',
        caption: 'Order management interface',
      },
      {
        type: 'video',
        url: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
        thumbnail:
          'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
        caption: 'Short walkthrough demo',
      },
      {
        type: 'document',
        url: 'https://samplelib.com/lib/preview/pdf/sample-3.pdf',
        caption: 'Implementation summary (PDF)',
      },
    ],
    client: 'IT-TRENDCO',
    date: 'July 2023',
    technologies: [
      'Angular',
      'Laravel',
      'Pusher',
      'MySQL',
      'PWA',
      'Payment Integration',
    ],
    features: [
      'Real-time order tracking',
      'Table management system',
      'Kitchen display system',
      'Inventory management',
      'Online ordering and payment',
      'Customer loyalty program',
      'Sales and analytics reporting',
    ],
    demoUrl: '#',
    githubUrl: '#',
  },
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = id ? projects[id] : undefined
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button
              asChild
              className="bg-tech-purple hover:bg-tech-purple/90 text-white"
            >
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const mediaItems = useMemo(() => project.media || [], [project.media])
  const hasSingleDocument =
    mediaItems.length === 1 && mediaItems[0].type === 'document'

  const isPdf = (url: string) => url.toLowerCase().endsWith('.pdf')

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const navigateLightbox = (direction: 1 | -1) => {
    if (lightboxIndex === null) return
    const nextIndex =
      (lightboxIndex + direction + mediaItems.length) % mediaItems.length
    setLightboxIndex(nextIndex)
  }

  useEffect(() => {
    if (lightboxIndex === null) return

    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }
      if (event.key === 'ArrowRight') {
        navigateLightbox(1)
      }
      if (event.key === 'ArrowLeft') {
        navigateLightbox(-1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      document.body.style.paddingRight = originalPaddingRight
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxIndex, mediaItems.length])

  useEffect(() => {
    if (lightboxIndex === null || mediaItems.length < 2) return

    const preloadIndexes = [
      (lightboxIndex + 1) % mediaItems.length,
      (lightboxIndex - 1 + mediaItems.length) % mediaItems.length,
    ]

    preloadIndexes.forEach((index) => {
      const item = mediaItems[index]
      if (item.type === 'image') {
        const image = new Image()
        image.src = item.url
      }
      if (item.type === 'video' && item.thumbnail) {
        const image = new Image()
        image.src = item.thumbnail
      }
    })
  }, [lightboxIndex, mediaItems])

  return (
    <>
      <Helmet>
        <link
          rel="canonical"
          href={`https://yourwebsite.com/projects/${project.id}`}
        />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <title>{project.title} | Project Details</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={project.title} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.coverImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.description,
            codeRepository: project.githubUrl || undefined,
            dateCreated: new Date(project.date).toISOString(),
            programmingLanguage: project.technologies[0],
            keywords: project.technologies.join(', '),
            image: project.coverImage,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Projects',
                item: 'https://yourwebsite.com/projects',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: project.title,
                item: `https://yourwebsite.com/projects/${project.id}`,
              },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="pt-24 pb-12">
        {/* Hero section */}
        <section className="relative h-[60vh] overflow-hidden">
          {/* Optimized hero image */}
          <OptimizedImage
            src={project.coverImage}
            alt={project.title}
            priority
            withSkeleton
            className="absolute inset-0 w-full h-full object-cover"
            widths={[640, 960, 1280, 1600]}
          />
          <OptimizedImage
            src={project.coverImage}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover opacity-35 scale-105 blur-[1px]"
            widths={[640, 960, 1280, 1600]}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/80" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_55%)]" />

          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-tech-purple/20 blur-2xl" />
            <div className="absolute top-24 right-1/3 h-20 w-20 rounded-full bg-tech-purple/15 blur-xl" />
            <div className="absolute bottom-10 left-10 h-24 w-24 rounded-full bg-tech-purple/10 blur-2xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10 h-full flex items-end pb-8">
            <div className="max-w-3xl">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-tech-purple mb-4 hover:underline"
              >
                <ArrowLeft size={16} />
                Back to Projects
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {project.title}
              </h1>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar size={16} />
                  <span>{project.date}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">
                  Client: {project.client}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Project Overview</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>

                {/* Image gallery */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Project Gallery</h2>
                  {mediaItems.length === 0 ? (
                    <div className="text-muted-foreground text-sm">
                      No media available for this project yet.
                    </div>
                  ) : hasSingleDocument ? (
                    <div className="bg-secondary/30 backdrop-blur-sm rounded-lg border border-border p-6 flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-tech-purple/10 flex items-center justify-center">
                        <FileText className="text-tech-purple" size={28} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          Project Document
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {mediaItems[0].caption ||
                            'Open the full project document for a complete view.'}
                        </p>
                      </div>
                      <Button
                        asChild
                        className="bg-tech-purple hover:bg-tech-purple/90 text-white"
                      >
                        <a
                          href={mediaItems[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Open Document
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mediaItems.map((media, index) => (
                        <div key={index} className="perspective-container">
                          <div className="bg-secondary/30 backdrop-blur-sm rounded-lg overflow-hidden card-hover">
                            {media.type === 'image' && (
                              <button
                                type="button"
                                onClick={() => openLightbox(index)}
                                className="w-full text-left"
                              >
                                <OptimizedImage
                                  src={media.url}
                                  loading="lazy"
                                  decoding="async"
                                  alt={
                                    media.caption ||
                                    `Project image ${index + 1}`
                                  }
                                  className="w-full h-48 object-cover"
                                  withSkeleton
                                  widths={[400, 640, 768, 1024]}
                                />
                              </button>
                            )}

                            {media.type === 'video' && (
                              <button
                                type="button"
                                onClick={() => openLightbox(index)}
                                className="w-full text-left relative"
                              >
                                {media.thumbnail ? (
                                  <OptimizedImage
                                    src={media.thumbnail}
                                    loading="lazy"
                                    decoding="async"
                                    alt={
                                      media.caption ||
                                      `Project video ${index + 1}`
                                    }
                                    className="w-full h-48 object-cover"
                                    withSkeleton
                                    widths={[400, 640, 768, 1024]}
                                  />
                                ) : (
                                  <div className="w-full h-48 bg-muted/50 flex items-center justify-center">
                                    <FileVideo
                                      className="text-tech-purple"
                                      size={36}
                                    />
                                  </div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-12 h-12 rounded-full bg-tech-purple/80 flex items-center justify-center">
                                    <Play className="text-white" size={20} />
                                  </div>
                                </div>
                              </button>
                            )}

                            {media.type === 'document' && (
                              <div className="p-6 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-tech-purple/10 flex items-center justify-center">
                                  <FileText
                                    className="text-tech-purple"
                                    size={22}
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {media.caption || 'Project Document'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Open to view in full screen
                                  </p>
                                </div>
                                <Button
                                  asChild
                                  variant="outline"
                                  className="border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                                >
                                  <a
                                    href={media.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Open
                                  </a>
                                </Button>
                              </div>
                            )}

                            {media.caption && media.type !== 'document' && (
                              <div className="p-4">
                                <p className="text-sm text-muted-foreground">
                                  {media.caption}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features */}
                {project.featureSections?.length ? (
                  <div className="space-y-10">
                    {project.featureSections.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="space-y-4">
                        <h2 className="text-2xl font-bold">{section.title}</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {section.items.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 rounded-full bg-tech-purple/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-tech-purple"></div>
                              </div>
                              <span className="text-muted-foreground">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Key Features</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(project.features ?? []).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-tech-purple/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-tech-purple"></div>
                          </div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project details */}
                <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg border border-border card-hover">
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Client
                      </h4>
                      <p>{project.client}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Date
                      </h4>
                      <p>{project.date}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="pt-4 space-y-2">
                      {project.demoUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full flex items-center gap-2 border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                        >
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          asChild
                          variant="outline"
                          className="w-full flex items-center gap-2 border-tech-purple text-tech-purple hover:bg-tech-purple/10"
                        >
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={16} />
                            GitHub Repository
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact card */}
                <div className="bg-secondary/30 backdrop-blur-sm p-6 rounded-lg border border-border card-hover">
                  <h3 className="text-xl font-bold mb-4">
                    Need a similar project?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    If you're interested in creating a similar solution for your
                    business, let's discuss how I can help!
                  </p>
                  <Button
                    asChild
                    className="w-full bg-tech-purple hover:bg-tech-purple/90 text-white"
                  >
                    <a href="/#contact">Contact Me</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related projects section - can be implemented if you have more projects */}
      </main>

      <Footer />

      {lightboxIndex !== null && mediaItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
            aria-label="Close"
          >
            <X size={18} />
          </button>

          {mediaItems.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => navigateLightbox(-1)}
                className="absolute left-4 md:left-8 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => navigateLightbox(1)}
                className="absolute right-4 md:right-8 w-10 h-10 rounded-full bg-secondary/60 flex items-center justify-center hover:bg-secondary"
                aria-label="Next"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <div className="max-w-5xl w-full">
            {mediaItems[lightboxIndex].type === 'image' && (
              <OptimizedImage
                src={mediaItems[lightboxIndex].url}
                alt={
                  mediaItems[lightboxIndex].caption ||
                  `Project image ${lightboxIndex + 1}`
                }
                className="w-full max-h-[75vh] object-contain rounded-lg"
                withSkeleton
                widths={[640, 960, 1280, 1600]}
              />
            )}

            {mediaItems[lightboxIndex].type === 'video' && (
              <div className="w-full">
                <video
                  src={mediaItems[lightboxIndex].url}
                  controls
                  muted
                  playsInline
                  onVolumeChange={(event) => {
                    const videoElement = event.currentTarget
                    if (!videoElement.muted || videoElement.volume !== 0) {
                      videoElement.muted = true
                      videoElement.volume = 0
                    }
                  }}
                  className="w-full max-h-[75vh] rounded-lg bg-black"
                />
              </div>
            )}

            {mediaItems[lightboxIndex].type === 'document' && (
              <div className="bg-secondary/30 border border-border rounded-lg p-6">
                {isPdf(mediaItems[lightboxIndex].url) ? (
                  <iframe
                    title="Project document"
                    src={mediaItems[lightboxIndex].url}
                    className="w-full h-[70vh] rounded-md"
                  />
                ) : (
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-tech-purple/10 flex items-center justify-center">
                      <FileText className="text-tech-purple" size={28} />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {mediaItems[lightboxIndex].caption ||
                          'Open the document in a new tab'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This document will open in a new tab for the best view.
                      </p>
                    </div>
                    <Button
                      asChild
                      className="bg-tech-purple hover:bg-tech-purple/90 text-white"
                    >
                      <a
                        href={mediaItems[lightboxIndex].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Document
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {mediaItems[lightboxIndex].caption && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                {mediaItems[lightboxIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectDetail
