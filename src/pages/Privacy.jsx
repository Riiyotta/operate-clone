/*
 * PLACEHOLDER COPY — replace before launch.
 * The body text of this page is generic placeholder prose written for the clone; it is NOT Operate's
 * Privacy Policy. Only the structure is replicated (CLONE_SPEC_PAGES §1.4): title, effective date,
 * section/sub-heading list, the number of paragraphs/list items/inline elements per section, and
 * roughly matching character counts (the first argument of P/LI) so the layout height matches.
 *
 * The two in-page anchors (#7-cookies-and-similar-technologies, #9-retention) are kept exactly as in
 * the original: no heading carries those ids, so they only change the URL hash.
 */
import LegalPage, { A, B, CODE, FILL, H2, H3, LI, P, RAW, UL } from '../components/pages/LegalPage.jsx'

const LEGAL_EMAIL = A('legal@operate.so', 'mailto:legal@operate.so')
const SCOPE = (name) => B(CODE(`https://www.googleapis.com/auth/${name}`))

const BLOCKS = [
  P(452, 'This placeholder Privacy Policy explains, in general terms, how information is handled when you visit ', A('operate.so', 'https://operate.so'), ' or use the related services. ', FILL),
  P(165, 'This policy should be read together with our ', A('Terms of Service', '/terms'), '. ', FILL),
  RAW('Questions? Email us at ', LEGAL_EMAIL, '.'),

  H2('1. What this Privacy Policy covers'),
  P(479),

  H2('2. Personal Data'),
  P(165),
  H3('Marketing site (operate.so)'),
  P(193, 'If you join the waitlist, we collect your ', B('email address'), ' and the answers you choose to give. ', FILL),
  H3('Account and profile'),
  P(304, 'Sign-in is handled by our ', B('authentication provider'), ', which shares basic profile details with us. ', FILL),
  H3('Customer Content'),
  P(315),
  H3('Connected Google services'),
  P(232),
  H3('Connected Slack data'),
  P(235),
  H3('Automatically collected information'),
  P(292, 'Technical data such as device and usage information may be collected automatically, as described in ', A('Section 7', '#7-cookies-and-similar-technologies'), '. ', FILL),

  H2('3. How we use information'),
  P(37, 'We use the information described above to:'),
  UL(LI(65), LI(65), LI(130), LI(165), LI(80), LI(80), LI(65), LI(63)),

  H2('4. Connected Google services'),
  P(125),
  H3('Scopes we request'),
  P(86, 'The scopes below are defined in Google’s ', A('OAuth 2.0 scope documentation', 'https://developers.google.com/identity/protocols/oauth2/scopes'), '.'),
  UL(
    LI(235, SCOPE('gmail.readonly'), ' — ', FILL),
    LI(137, SCOPE('calendar.readonly'), ' — ', FILL),
    LI(180, SCOPE('userinfo.email'), ' and ', SCOPE('userinfo.profile'), ' — ', FILL),
    LI(315, SCOPE('gmail.modify'), ' — used ', B('only'), ' for the placeholder purpose described here. ', FILL),
    LI(205, SCOPE('meetings.space.readonly'), ' — ', FILL),
  ),
  H3('Data we receive and store'),
  P(480),
  H3('Limited Use'),
  P(145, 'Use of data received from Google APIs follows the ', A('Google API Services User Data Policy', 'https://developers.google.com/terms/api-services-user-data-policy'), '. ', FILL),
  UL(LI(165), LI(226), LI(150), LI(302)),
  H3('AI and machine learning'),
  P(268, 'Connected data is processed ', B('only to provide features inside the customer’s own account'), '. ', FILL),
  UL(LI(163, 'Connected data is ', B('not'), ' used for the purpose described in this placeholder item. ', FILL), LI(163, 'Connected data is ', B('not'), ' shared for the purpose described in this placeholder item. ', FILL)),
  H3('Disconnecting and revoking access'),
  P(280, 'Access can be revoked at any time from ', A('Google Permissions', 'https://myaccount.google.com/permissions'), '. ', FILL, ' See ', A('Retention', '#9-retention'), ' for more.'),

  H2('5. How we share information'),
  P(82),
  UL(
    LI(356, B('Service providers.'), ' ', FILL),
    LI(240, B('Within your organization.'), ' ', FILL),
    LI(267, B('Legal and safety requirements.'), ' ', FILL),
    LI(267, B('Business transfers.'), ' ', FILL),
    LI(89, B('With your consent.'), ' ', FILL),
  ),

  H2('6. How we use AI models'),
  P(430),

  H2('7. Cookies and similar technologies'),
  P(326),
  P(114),

  H2('8. Your choices and rights'),
  RAW('You can:'),
  UL(
    LI(160, B('Access, correct, or delete'), ' your information by writing to ', LEGAL_EMAIL, '. ', FILL),
    LI(130, B('Opt out of marketing emails'), ' ', FILL),
    LI(130, B('Revoke access'), ' ', FILL),
    LI(30, B('Close your account'), ' ', FILL),
  ),
  P(278),

  H2('9. Retention'),
  P(129),
  UL(
    LI(213, B('Customer Content'), ' ', FILL),
    LI(71, B('Waitlist email addresses'), ' ', FILL),
    LI(71, B('Backups'), ' ', FILL),
    LI(144, B('Aggregated or de-identified data'), ' ', FILL),
  ),

  H2('10. International transfers'),
  P(290),

  H2('11. Security'),
  P(267),

  H2('12. Children'),
  P(270, FILL, ' If you believe a child has provided information, contact ', LEGAL_EMAIL, '.'),

  H2('13. Changes to this policy'),
  P(280),

  H2('14. Contact us'),
  RAW('For questions about this policy, you can reach us at the address below:'),
  RAW(B('Operate Machine, Co.')),
  RAW('2261 Market Street STE 86910'),
  RAW('San Francisco, CA 94114'),
  RAW(LEGAL_EMAIL),
]

export default function Privacy() {
  return <LegalPage title="Privacy Policy" effectiveDate="July 1, 2026" blocks={BLOCKS} />
}
