/*
 * PLACEHOLDER COPY — replace before launch.
 * The body text of this page is generic placeholder prose written for the clone; it is NOT Operate's
 * Terms of Service. Only the structure is replicated (CLONE_SPEC_PAGES §1.4): title, effective date,
 * section/sub-heading list, plain table of contents, the number of paragraphs/inline elements per
 * section, an <hr> after every numbered section, and roughly matching character counts (the first
 * argument of P) so the layout height matches.
 */
import LegalPage, { A, B, FILL, H2, H3, HR, OL, P, RAW } from '../components/pages/LegalPage.jsx'

const PRIVACY = A('Privacy Policy', '/privacy')

const BLOCKS = [
  P(470, 'These placeholder terms (the ', B('Agreement'), ') describe, in general terms, the relationship between Operate Machine, Co. (', B('Operate'), ') and the organization using the service. ', FILL),
  P(362, 'The organization accepting this Agreement is referred to as the ', B('Customer'), '. ', FILL),
  OL(
    'The Service',
    'Restrictions',
    'Third-Party Applications',
    'Payment Obligations',
    'Term and Termination',
    'Warranties and Disclaimers',
    'Limitation of Liability',
    'Confidentiality',
    'Data',
    'General Terms',
  ),

  H2('1. The Service'),
  H3('1.1 Service Description'),
  P(800, 'The hosted application (the ', B('Service'), ' or ', B('App'), ') and the website at ', A('operate.so', 'https://operate.so'), ' (the ', B('Site'), ') are described here in placeholder form. Material provided by users (a ', B('User Submission'), '), material provided by the provider (', B('Operate Content'), '), and any downloadable components (', B('Software'), ') are defined for convenience. ', FILL),
  H3("1.2 Customer's Subscription"),
  P(512, 'Each ordering document (', B('Order(s)'), ') sets out the subscription term (', B('Subscription Period'), ') and the individuals permitted to use the Service (', B('Users'), '). ', FILL),
  H3("1.3 Operate's Ownership"),
  P(545, 'The provider retains its rights in the Service, the Site, and related materials (the ', B('Operate Materials'), '). ', FILL),
  H3('1.4 Permissions'),
  P(906, 'Access rights granted to Users (', B('Permissions'), ') may extend to a related entity (an ', B('Affiliate'), ') where the Order allows. ', FILL),
  HR,

  H2('2. Restrictions'),
  H3("2.1 Customer's Responsibilities"),
  P(324),
  H3('2.2 Use Restrictions'),
  P(1866),
  H3('2.3 API Access Restrictions'),
  P(324, 'Programmatic interfaces (', B('APIs'), ') may only be used as documented. ', FILL),
  HR,

  H2('3. Third-Party Applications'),
  P(1090, 'The Service may connect to products offered by others (', B('Third-Party Applications'), '). ', FILL, ' ', B('This placeholder sentence stands in for the disclaimer that will apply to Third-Party Applications in the final text.')),
  P(234, 'Data received from Google APIs is handled under the ', A('Google API Services User Data Policy', 'https://developers.google.com/terms/api-services-user-data-policy'), ' and our ', PRIVACY, '. ', FILL),
  HR,

  H2('4. Payment Obligations'),
  H3('4.1 Fees'),
  P(613, 'The amounts payable under each Order (the ', B('Fees'), ') are described here. ', FILL),
  H3('4.2 Payment'),
  P(1100, 'Payments may be handled by a third-party processor (the ', B('Payment Processor'), '). ', FILL, ' ', B('This placeholder sentence stands in for the final wording on recurring charges, which will be confirmed in the Order before any charge is made.')),
  H3('4.3 Taxes'),
  P(557, 'Fees exclude applicable sales, use, and similar charges (', B('Taxes'), '). ', FILL),
  H3('4.4 Failure to Pay'),
  P(710),
  HR,

  H2('5. Term and Termination'),
  H3('5.1 Agreement Term and Renewals'),
  P(1065, 'Subscriptions begin on the date stated in the Order (the ', B('Subscription Start Date'), '). Billing questions can be sent to ', A('billing@operate.so', 'mailto:billing@operate.so'), '. The overall duration of this Agreement (the ', B('Term'), ') and any no-cost tier (the ', B('Free Version'), ') are described here. ', FILL),
  H3('5.2 Termination'),
  P(279),
  H3('5.3 Effect of Termination'),
  P(1100),
  H3('5.4 Survival'),
  P(278),
  HR,

  H2('6. Warranties and Disclaimers'),
  H3('6.1 Warranties'),
  P(281),
  H3('6.2 Warranty Disclaimer'),
  P(900),
  HR,

  H2('7. Limitation of Liability'),
  P(1100),
  HR,

  H2('8. Confidentiality'),
  H3('8.1 Definition'),
  P(1077, 'The party receiving information (the ', B('Receiving Party'), ') and the party sharing it (the ', B('Disclosing Party'), ') agree that non-public business information (', B('Confidential Information'), ') is treated as described here. ', FILL),
  H3('8.2 Protection and Use of Confidential Information'),
  P(943, 'Employees, advisors, and contractors with a need to know (', B('Representatives'), ') may receive Confidential Information. ', FILL),
  H3('8.3 Compelled Access or Disclosure'),
  P(323),
  H3('8.4 Feedback'),
  P(625, 'Suggestions about the Service (', B('Feedback'), ') may be used freely. ', FILL),
  HR,

  H2('9. Data'),
  H3('9.1 User Information'),
  P(996, 'Account details supplied by Users (', B('User Information'), ') are described here. ', FILL),
  H3('9.2 User Submissions'),
  P(387),
  H3('9.3 Service Data'),
  P(536, 'Technical and usage information generated by the Service (', B('Service Data'), ') is described here. ', FILL),
  H3('9.4 AI and Machine Learning'),
  P(780, 'Content generated by AI features (', B('Output'), ') is described here. ', FILL),
  H3('9.5 Data Protection'),
  P(505, 'Customer-provided data (', B('Customer Data'), ') is handled as described in our ', PRIVACY, '. ', FILL),
  HR,

  H2('10. General Terms'),
  H3('10.1 Publicity'),
  P(178),
  H3('10.2 Force Majeure'),
  P(372),
  H3('10.3 Changes'),
  P(438, 'The current version of these terms is published at ', A('operate.so/terms', 'https://operate.so/terms'), '. ', FILL),
  H3('10.4 Relationship of the Parties'),
  P(172),
  H3('10.5 No Third-Party Beneficiaries'),
  P(162),
  H3('10.6 Email Communications'),
  P(480, FILL, ' Notices can be sent to ', A('legal@operate.so', 'mailto:legal@operate.so'), '.'),
  H3('10.7 Amendment and Waivers'),
  P(377),
  H3('10.8 Severability'),
  P(345),
  H3('10.9 Assignment'),
  P(650),
  H3('10.10 Governing Law and Venue'),
  P(905),
  H3('10.11 Entire Agreement'),
  P(238),
  HR,

  H2('Contact'),
  RAW(B('Operate Machine, Co.')),
  RAW('2261 Market Street STE 86910'),
  RAW('San Francisco, CA 94114'),
  RAW(A('legal@operate.so', 'mailto:legal@operate.so')),
]

export default function Terms() {
  return <LegalPage title="Terms of Service" effectiveDate="April 28, 2026" blocks={BLOCKS} />
}
