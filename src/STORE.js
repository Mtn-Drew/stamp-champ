export default {
  "template": [
    {
      "id": "1",
      "title": "WORK",
      "order" : 1
    },
    {
      "id" : "2",
      "title" : "PERSONAL",
      "order" : 2
    }

  ],

  "load_out" : [
    {
      "id" :"1",
      "title":"CONV",
      "template_id":"1",
      "order" : 1,
    },
    {
      "id" :"2",
      "title":"CASE NOTES",
      "template_id":"1",
      "order" : 2
    },
    {
      "id" :"3",
      "title":"MISC",
      "template_id":"1",
      "order" : 3
    },
    {
      "id" :"4",
      "title":"CUSTOM",
      "template_id":"1",
      "order" : 4
    },
    {
      "id" :"5",
      "title":"CUSTOM1",
      "template_id":"2",
      "order" : 1
    },
    {
      "id" :"6",
      "title":"CUSTOM2",
      "template_id":"2",
      "order" : 2
    },
    {
      "id" :"7",
      "title":"CUSTOM3",
      "template_id":"2",
      "order" : 3
    },
    {
      "id" :"8",
      "title":"CUSTOM4",
      "template_id":"2",
      "order" : 4
    }
  ],
  "stamps" : [
    
      {
        "id" :"1",
        "title":"INBOUND OTHER",
        "load_out_id":"1",
        "content" : "'Contact Type: Inbound Call\nContact With: Relationship, name\nPhone: \nDetails of Conversation: TT: \nNext Steps to Advance Case:'"
      },
      {
        "id" :"2",
        "title":"OUTBOUND OTHER",
        "load_out_id":"1",
        "content" : "'Contact Type: Outbound Call\nContact With: Relationship, name\nPhone: \nDetails of Conversation: TT: \nNext Steps to Advance Case: '"
      },
      {
        "id" :"3",
        "title":"SELLER",
        "load_out_id":"1",
        "content" : "CONVERSATION WITH THE SELLER(s)\n-TT: \n-Phone: \n-Discussed transfer option: Yes / No\n-The customer(s) intention is to: \n-Confirmed where they are in the purchase process: \n-IS H/O making solar a contingency of the home sale: N/A / Yes / No\n-Received permission to share information: Yes/ No\n-Requested forwarding address: Yes/ No (if no did seller refuse )\n-Listing Agents contact information:\n-Discussed disconnecting SG Modem and leaving it on a counter for buyers: Yes / No\n-Pre PTO- Informed the customer that PTO has been paused : N/A / Yes / No\n-For Oregon Only - Discussed RETC and remaining balance: N/A / Yes / No\n-Informed the customer of their delinquent balance: N/A / Yes / No\n-If delinquent, informed that if not paid, it will be invoiced through escrow:  N/A / Yes/ No\n\nSummary of Call: "
      },
      {
        "id" :"4",
        "title":"INTRO VM",
        "load_out_id":"1",
        "content" : "Contact Type: Outbound Call\nContact with Seller / Buyer: \nPhone: \nLVM: For Seller/Buyer to follow up regarding the sale/purchase of the property and go over transfer Process. Left my phone number for a call back.\n \nNext Steps to Advance Case:"
      },
      {
        "id" :"5",
        "title":"LISTING AGENT",
        "load_out_id":"1",
        "content" : "CONVERSATION WITH THE LISTING AGENT\n \n-TT (name/number): \n-Discussed Sellers intentions: yes / no\n-Discussed contingency on the home sale: yes / no\n-Discussed the Reassignment Agents' role in the transfer of the solar agreement: yes / no\n-Expected COE Date:  \n-Requested the Buyer's Agent contact information: \n\n-Summary of Call:"
      },
      {
        "id" :"6",
        "title":"BUYER'S AGENT",
        "load_out_id":"1",
        "content" : "'CONVERSATION WITH THE BUYERS AGENT\n \n-TT (name/number): \n-Confirmed where they are in the purchase process:\n-Does the Buyer have a copy of the contract: \n-Expected COE Date: \n-Requested the Buyers information: \n-Requested Escrow/Title contact information:  \n\n-Summary of Call: '"
      },
      {
        "id" :"7",
        "title":"BUYER",
        "load_out_id":"1",
        "content" : "CONVERSATION WITH THE BUYER(s)\n-TT:\n-Phone: \n-Email: \n-Confirmed where they are in the purchase process: \n-Expressed the Seller's intention: \n-Expected COE Date: \n-Verified they have a copy of the contract: \n-Discussed the customer's obligations: (Monthly payments, escalator, ACH and internet): \n-Discussed our obligations to the customer: (Warranty, insurance, repair promise, PeGu, etc.): \n-Discussed estimated production: \n-Discussed the transfer process: \n-Discussed the credit policy: \n-How is the title of home going to be held:  name/ trust/ LLC\n-Exact Name on title: \n-Are you on a special program with the local utility ( ex: Care/ Medical baseline etc. ): yes / no\n-If utility is MP2- advised to enroll within MP2 for NEM for a 1:1 credit: n/a / yes / no\n-Discussed that the Billing Portal is currently unavailable and ACH will need to be set up through CC: yes / no \n\n-Summary of Call:"
      },
      {
        "id" :"8",
        "title":"ESCROW COE",
        "load_out_id":"1",
        "content" : "'Contact Type: Outbound Call\nTT Escrow: (Escrow/Title Agents Name)\nPhone: \nDetails of Conversation: Spoke with Escrow to confirm COE. Confirmed COE on (date) OR Extended COE to (date)\n \n(If an invoice was sent): Confirmation that payment has been sent (tracking number if applicable): \n\nNext Steps to Advance Case:  Pending COE OR Closing Case OR Pending Payment (Agent to specify: Partial Prepay/Full Prepay/RETC/Purchase)'"
      },
      {
        "id" :"9",
        "title":"INTRO NOTE",
        "load_out_id":"2",
        "content" : "Seller Name: \n  Phone: \n  Email: \n\nSeller Forwarding Address: \n\nListing Agent: N/A\n  Phone: \n  Email: \n\nSelling or Buyer Agent: N/A\n  Phone: \n  Email: \n\nBuyer Name: \n  Phone: \n  Email: \n\nEscrow Company: \n  Phone: \n  Email: \n\nEstimated Closing of Escrow Date:  "
      },
      {
        "id" :"10",
        "title":"SENT CVF FOR SIGNATURE",
        "load_out_id":"2",
        "content" : "'*CV Form Sent to Buyer via Adobe Sign.* \nChanging Flow Status to Pending Credit Approval'"
      },
      {
        "id" :"11",
        "title":"CREDIT RESULT",
        "load_out_id":"2",
        "content" : "'CREDIT APPROVED\nBUYERNAME has been approved via soft credit check.\nContact ID: \n\nCONTACT ID CREATED \nBUYERNAME has been added as a contact.\nContact ID: \n\nCREDIT DECLINED\nBUYERNAME has been conditionally approved. The score is below our minimum of 650.\nContact ID:\n\nAction Taken:\nCreated $250 Credit Fee Inoice Case.\n\n******$250 fee will be required for this reassignment to proceed******\n\nUNABLE TO OBTAIN CREDIT\nWe were unable to approve this customer at this time.\nContact ID:\n\nAction Taken:\nFollowed up with buyer to request social security number or outside credit report.\n\nCREDIT NOT PULLED\nReceived leadership approval in mod case that we are proceeding without a credit score on file.\n******$250 fee will be required for this reassignment to proceed******\nOR\n$250 Fee Waived - Approval provided within same mod case.'"
      },
      {
        "id" :"12",
        "title":"SENT TA FOR SIGNATURE",
        "load_out_id":"2",
        "content" : "'*Received Credit Contact ID - TA sent out for signature via Adobe Sign*\nChanging Flow Status to Pending Signed Transfer Agreement.\n\nContact Type: Outbound Call\nContact With Seller: \nPhone: \nForwarding address: \n\nDetails of Conversation: TT / LVM: Sent out the TA for signatures via email through Adobe Sign.\nLet the seller know to leave the SG Router that connects to the internet on a counter for the buyer to easily find it.\n\n\nContact Type: Outbound Call\nContact With Buyer: \nPhone: \n\nDetails of Conversation: TT / LVM: Sent out the TA for signatures via email through Adobe Sign.'"
      },
      {
        "id" :"13",
        "title":"RELOCATION",
        "load_out_id":"2",
        "content" : "Subject Line->  Contract Reassignment - [INQUIRY] [STANDARD] Relocation \n\n Case Queues:\nOwner: TBA Asset Control\nSource: Internal\nQueue: System Relocation -PV\nSub Queue: 1. Project Inquiry\nStatus: Open\nFlow Status: 1a. No Work Done\nNote: Any pertinent information.\nSpecifically state in your note that this is an inquiry.\n \nCustomer's Information: \n    Name(s) of customer(s) \n    Name of Primary contact: \n    Preferred phone number: \n    Preferred email address: \nListing Agent's Information: \n    Name of primary contact: \n    Preferred phone number: \n    Preferred email address: \nNew Home Buyer's Information: \n    Name of primary contact: \n    Phone number: \n    Email address: \nBuyer's Agent Information: \n    Name: \n    Phone number: \n    Email address: \nEscrow Information : \n    Name: \n    Phone number: \n    Email address: \nDate of Close of Escrow for current home: \nDate of Close of Escrow for new home: \nAddress of new home: \nUtility District of new home: \nIs there an aerial view available? \nAre there any escalations we should know about? \nReason why new buyer did not assume the contract: \nIf new house is still under construction, did you request the blue prints? \n Explained the relocation process & associated fees to customer? \nIf system is being moved to a friend/relative's house: \n    Name of primary contact: \n        Phone number: \n        Email address: \n    Did you run credit for this person? \n    If applicant passed credit, did you add him/her to the contract? \nIs system deactivated? \nWhen was it deactivated? \nName of person currently residing in the home:"
      },
      {
        "id" :"14",
        "title":"LENDER RELATIONS",
        "load_out_id":"2",
        "content" : "'Subject Line -> CR [FNMA] [Insurance] [FHA] [Payoff] [Billing History] [Questionnaire] [Discussion] [Golden1]\n\n'Owner: Recordings\nQueue: Lender Relations\nSub Queue: Reassignment Request\n\n***Please delete above before saving note***\n\nPlease contact the party below due to Contract Reassignment\nNotes: \nName: \nRelationship: \nTelephone: \nEmail:''"
      },
      {
        "id" :"15",
        "title":"RELEASE UCC",
        "load_out_id":"2",
        "content" : "Subject Line -> Reassignment - Release UCC-1\n\nTransfer Agreement received. Please send UCC release to: \n\nName: \nPhone: \nEmail: \n\nNormal Turnaround Time: 2-3 business days \nUrgent Turnaround Time: 2 hours (if submitted prior to 4pm)\n\nReason for Urgency: \n\n(Agent to Delete what doesn't apply from the above)"
      },
      {
        "id" :"16",
        "title":"RELEASE PUC",
        "load_out_id":"2",
        "content" : "Subject Line -> Reassignment - Release PUC\n\n'Transfer Agreement received. Please send PUC release to: \n  \nName: \nPhone: \nEmail:  \nMailing Address: \n\nNormal Turnaround Time: 2-3 business days \nUrgent Turnaround Time: 2 hours (if submitted prior to 4pm)\n\nReason for Urgency: \n\n(Agent to Delete what doesn't apply from the above)"
      },
      {
        "id" :"17",
        "title":"UCC RELEASE - REMOVAL SETTLEMENT",
        "load_out_id":"3",
        "content" : "'Subject Line -> Redeployment - Release UCC-1\n\nRemoval/Settlement Agreement received. Please send UCC release to:\n \nName: \nPhone: \nEmail:'"
      },
      {
        "id" :"18",
        "title":"PUC RELEASE - REMOVAL SETTLEMENT",
        "load_out_id":"3",
        "content" : "'Subject Line -> Redeployment - Release PUC\n\nRemoval/Settlement Agreement received. Please send PUC release to:\n \nName: \nPhone: \nEmail: '"
      },
      {
        "id" :"19",
        "title":"$250 CREDIT FEE INVOICE REQUEST",
        "load_out_id":"3",
        "content" : "'Subject Line -> Contract Reassignment Credit Policy Fee $250 Invoice Needed\n\nOwner: Invoicing - HIA \nSource: Internal\nQueue: Invoice\nSubqueue: Transfer Credit Fee\nStatus: Open\nFlow Status: Pending invoice creation \n \nCase Note: \nPlease send invoice for $250.00 amount due for credit policy fee\n \nName(s) of Person To Pay the $250:\nThe person will be paying via: Escrow Check/Personal Check/Call-in/Unknown at this time \nEmail Address: \nTelephone:\nEscrow email (if applicable): '"
      },
      {
        "id" :"20",
        "title":"FINOPS BILLING INQUIRY",
        "load_out_id":"3",
        "content" : "'Subject Line -> CR Research Request\n\nCase Owner: Billing Team (billingteam) \nQueue: Finops Inquiry \nSub Queue: Contract Reassignment \nOR \nSub Queue: Billing - RETC (for RETC requests ONLY) \nFlow Status: No Work Done \nPriority: Urgent \n \n[Delete the above after setting up case]\n\nCreated case for Finops Billing to research the following: \n[List the information you need from finops.] \n\nBackground Information: \n[List of bullets of steps already taken and what you already know.]\n\nEstimated closing date: '"
      },
      {
        "id" :"21",
        "title":"RECEIVED PREPAY CHECK",
        "load_out_id":"3",
        "content" : "'I have received the check for the full NPV/ partial prepayment / settlement amount / Pre PTO system removal \nScanned copy in CR folder.\nGave check to: supervisors name \nCheck is to be handed off to Jessica Baker\nCheck #:\nAmount:'"
      },
      {
        "id" :"22",
        "title":"REDEPLOYMENT CASE",
        "load_out_id":"3",
        "content" : "Subject Line -> System Redeployment\n\nOwner: Supervisor\nQueue: Redeploy System\nSubQueue: Not Ready\nFlow: Pending Resolution \n \nDo not remove system until Settlement Agreement is signed. \n \nWho is requesting system Removal: Contract Reassignments/ BRT\n\nWho to contact to schedule removal: \no Name of primary contact: \no Relationship (i.e. Executor) \no Preferred phone number: \no Preferred email address: \n\nCustomer's Information: \no Name of primary contact: \no Preferred phone number: \no Preferred email address: \n\nNew Home Buyer's Information: \no Name of primary contact: \no Phone number: \no Email address: \n\nListing Agent's Information: (if applicable) \no Name: N/A \no Phone number: \no Email address: \n\nEscrow/Title Information: (if applicable) \no Name: N/A \no Phone number: \no Email address: \n\nDate of Close of Escrow: \nReason why new buyer did not assume the contract: \nDid the customer attempt a Relocation?\nIf yes what was the reason why customer did not relocate the system to his/her new residence? \nIs the customer going into willing default? \nIf no what type of agreement is needed (Settlement/Removal)? \nIs a New Owners Access Authorization Agreement form signed? \nIs the current homeowner planning on demolishing the home? \nIs the current homeowner planning on completing the roof repairs themselves? \nHave you gone over the removal and roof repair timelines with the current owner?\nRemoval timeline: 2-3 weeks (Add on an additional 30 days if a demo permit is required - East Coast)\nRoof repair timelines: Upon removal (Roof will be patched and sealed by the removal crew) \nName of person currently residing at the property: "
      },
      {
        "id" :"23",
        "title":"PAYMENT INVOICE REQUEST",
        "load_out_id":"3",
        "content" : "'Subject Line -> Contract Reassignment: Full Prepay/Partial Prepay/RRP/RETC (Agent to Select One)\n\nOwner: YOUR SUPERVISOR (they will verify financials and forward to the correct team as appropriate) \nSource: Internal\nQueue: Invoice\nSubqueue: Manual Invoice \nStatus: Open\nFlow Status: Pending Invoice Creation \n(Agent to delete the above after case set-up) \n\nPlease send invoice for the following breakdown: \nItem/Amount: \nFull Prepay/Partial Prepay/RRP/MyPower Payoff/RETC Amount: $X.XX [Agent to select what type of payment.]\nPast Due Amount: [Delete line if N/A or invoicing someone other than the seller]\nTax Percentage: X.XX% \nApplicable Tax: $X.XX [If no tax, agent to enter in $0.00. Please note that RETC, RRP, and pre-PTO have no tax.]\nTotal Due: $X.XX \n\nName of person(s) to pay the invoice: [Agent to enter in buyer or seller name]\nPhone #: \nTranche Legal Entity Name:\nAttn Invoice to: Contract Reassignment - [Agent to enter in their name]\nThe person will be paying via: Escrow Check/Personal Check/Call-in/Unknown at this time\n\nPlease set up email as follows: \nTo: [Agent to enter in escrow officer email or buyer/seller email]\nCC: [Agent to enter in their own email and any other applicable parties to cc]'"
      },
      {
        "id" :"24",
        "title":"REFUND REQUEST",
        "load_out_id":"3",
        "content" : "Subject Line -> Payment Request - [$Insert Refund Amount]\n\nOwner: Billing Team \nSource: Customer\nQueue: Payment Request \nSub Queue: Billing Error Refund \n\nDate of Loss: \nDescription of Loss: \nWas the loss caused by Tesla or a Tesla subcontractor? \nIs Payee a Tesla customer? Yes/No \nApprover: [name & title of approver]\nAmount Approved: \nApproval is documented in [insert queue name of case] Case: \nName of Payee: \nAddress of Payee: \nDocumentation showing refund request uploaded to the Operations folder'"
      },
      {
        "id" :"25",
        "title":"CUSTOM1",
        "load_out_id":"4",
        "content" : "Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad."
      },
      {
        "id" :"26",
        "title":"CUSTOM2",
        "load_out_id":"4",
        "content" : "Eos laudantium quia ab blanditiis temporibus necessitatibus. Culpa et voluptas ut sed commodi. Est qui ducimus id. Beatae sint aspernatur error ullam quae illum sint eum. Voluptas corrupti praesentium soluta cumque illo impedit vero omnis nisi.\n \rNam sunt reprehenderit soluta quis explicabo impedit id. Repudiandae eligendi libero ad ut dolores. Laborum nihil sint et labore iusto reiciendis cum. Repellat quos recusandae natus nobis ullam autem veniam id.\n \rEsse blanditiis neque tempore ex voluptate commodi nemo. Velit sapiente at placeat eveniet ut rem. Quidem harum ut dignissimos. Omnis pariatur quas aperiam. Quasi voluptas qui nulla. Iure quas veniam aut quia et."
      },
      {
        "id" :"27",
        "title":"CUSTOM3",
        "load_out_id":"4",
        "content" : "Distinctio dolor nihil ad iure quo tempore id ipsum. Doloremque sunt dicta odit. Id veritatis aut et doloremque natus.\n \rDeleniti temporibus repellendus molestias nemo. Cupiditate quae consectetur. Reiciendis corporis maxime consequatur qui quaerat cum aut. Quia officiis aut.\n \rAsperiores aut culpa voluptatem amet accusantium officia. Et et et adipisci ullam nesciunt eum magni totam. Quae repellendus suscipit animi vel laudantium sed enim nulla esse. Cupiditate quos minus laudantium autem eum quas tempore. Eos quibusdam quibusdam. Voluptatem molestiae qui accusamus blanditiis voluptates quia."
      },
      {
        "id" :"28",
        "title":"CUSTOM4",
        "load_out_id":"4",
        "content" : "Occaecati dignissimos quam qui facere deserunt quia. Quaerat aut eos laudantium dolor odio officiis illum. Velit vel qui dolorem et.\n \rQui ut vel excepturi in at. Ut accusamus cumque quia sapiente ut ipsa nesciunt. Dolorum quod eligendi qui aliquid sint.\n \rAt id deserunt voluptatem et rerum. Voluptatem fuga tempora aut dignissimos est odio maiores illo. Fugiat in ad expedita voluptas voluptatum nihil."
      },
      {
        "id" :"29",
        "title":"CUSTOM5",
        "load_out_id":"4",
        "content" : "Eum culpa odit. Veniam porro molestiae dolores sunt reiciendis culpa. Atque accusamus dolore eos odio facilis. Dolores reprehenderit et provident dolores possimus mollitia.\n \rAdipisci dolor necessitatibus nihil quod quia vel veniam. Placeat qui vero. Cum cum amet at nisi. Distinctio rerum similique explicabo atque ratione. Recusandae omnis earum est. Quas iusto nihil itaque architecto ea.\n \rPerferendis neque doloremque quibusdam accusantium ut dolor illum dolorum. Vero et similique nihil beatae. In repellendus dolores praesentium. Optio alias rerum culpa placeat maiores natus sed. Ipsa et qui cum ex maiores."
      },
      {
        "id" :"30",
        "title":"CUSTOM6",
        "load_out_id":"4",
        "content" : "Aliquid magnam ut quis quas impedit molestiae laudantium adipisci et. Officiis ut dolor rerum molestiae. Natus rerum libero aperiam. Rem aut consequatur. Quas soluta modi rerum id qui quis et voluptatem perferendis.\n \rIpsum quod sed minima rerum. Voluptatem pariatur voluptatem iure. Voluptatem perferendis qui doloremque distinctio nobis praesentium corrupti unde sed.\n \rPlaceat deleniti in praesentium aut tenetur. Recusandae debitis sint voluptates quam sed eum et quos qui. Atque esse nostrum et architecto qui perspiciatis odit aut. Aut quis corrupti ut. Maiores ratione sit dolor consectetur eius iusto illo sequi. Mollitia fugit dolores."
      },

    
  ]
}

