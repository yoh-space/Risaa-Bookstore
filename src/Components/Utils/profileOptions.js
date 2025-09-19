export const options = [
  {
    title: 'Account',
    data: [
      { id: 1, name: 'Payment History', icon: 'cart', route: 'PaymentHistory' },
      { id: 2, name: 'Quick Access', icon: 'book', modal: 'QuickAccessModal' },
      { id: 5, name: 'Notification', icon: 'notifications', route: 'Notification' },
    ],
  },
  {
    title: 'Settings',
    data: [
      { id: 3, name: 'Languages', icon: 'language', action: 'Languages' },
      { id: 14, name: 'Logout', icon: 'logout', action: 'logout' },
    ],
  },
  {
    title: 'App Info & Support',
    data: [
      { id: 6, name: 'About Us', icon: 'info', value: 'Risaa Bookstore', route: 'AuthorInfo' },
      { id: 7, name: 'Privacy Policy', icon: 'privacy-tip', route: 'PrivacyPolicy' },
      { id: 8, name: 'Terms & Conditions', icon: 'gavel', route: 'TermsConditions' },
      { id: 9, name: 'Help & Support', icon: 'help', route: 'HelpSupport' },
      { id: 13, name: 'FAQ', icon: 'feedback', route: 'FAQ' },
    ],
  },
  {
    title: 'Engage',
    data: [
      { id: 10, name: 'Rate Us', icon: 'star', route: 'RateApp' },
      { id: 12, name: 'Share App', icon: 'share', route: 'ShareApp' },
    ],
  },
  {
    title: 'Developer',
    data: [
      { id: 11, name: 'About Developer', icon: 'face', route: 'DeveloperInfo' },
    ],
  },
];