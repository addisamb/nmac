import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import { I18nManager, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const resources = {
  en: {
    translation: {
      // AUTH FLOW
      enter_your_name: 'Enter your name',
      enter_name: 'Enter name',
      // SPLASH SCREEN
      select_language: 'Select Language',
      english: 'English',
      arabic: 'Arabic',
      continue: 'Continue',
      view_result: 'view result',
      delete_aaccount: 'Delete Account',
      delete_aaccount_title:
        'Deleting your account will permanently erase all your data and settings',

      // OnboardingSCREEN1
      Onboarding_heading1: 'Elevate Your Investment Knowledge at Nmoacademy',
      Onboarding_text1:
        "Take your investment knowledge to the next level with Nmo academy's expert-led courses.",

      // OnboardingSCREEN2
      courses_available: 'Courses available',
      Onboarding_heading2:
        'Ask, Help, Earn: Our Interact & Reward Points Program',
      Onboarding_text2:
        'Interact and earn rewards with our points program! Help classmates and earn points redeemable for cash or future course purchases. Start building your rewards now.',
      skip: 'Skip',
      next: 'Next',
      reward_point: 'reward point',
      no_result_founds: 'No Result Founds',
      // SignUpScreen
      heading: 'Let’s you in',
      continue_with_google: 'Continue with Google',
      continue_with_mail: 'Continue with mail',
      continue_with_mobile: 'Continue with Mobile',
      email_verification: 'Enter your registered email',
      sms_verification: 'Enter your registered number',
      no_chat_found: 'No conversation found yet',

      // COMMON KEYS
      Lets_sign_in: 'Let’s sign in',
      enter_your_phone_number: 'Enter phone number',
      send_verification_code: 'Send verification code',
      skip_now: 'Skip now',
      enter_number: 'Enter phone number',

      enter_otp_code: 'Enter OTP code',
      otp_text:
        '4 digit code sent to your mobile. Please check and confirm the code to continue',
      didnt_get_otp: 'Didn’t get OTP?',
      otp: 'Otp',
      resend: ' Resend',
      confirm: 'Confirm',

      congratulations: 'Congratulations',
      account_registered: 'Your account has been registered',
      go_to_courses: 'Go to courses',

      email: 'Continue with your email',
      enter_your_email: 'Enter your email',
      password: 'Password',
      enter_your_password: 'Enter your password',
      forgot_password: 'Forgot your password?',
      sign_in: 'Sign in',
      or: 'OR',
      sign_in_with: 'Sign in with',
      welcome: 'Welcome',
      name: 'Your name',
      enter_full_name: 'Enter full name',
      your_name: 'Your name',
      your_email: 'Your email',
      terms_and_conditions:
        'By confirming, this will create your account. Review our terms and conditions',
      enter_mail: 'Enter your email',
      header_text: 'Sign in with',
      enter_phone_number: 'Enter Phone Number',

      // HOMESCREEN
      find_course: 'Find a course that interests you',
      your_account_has_been_deleted_by_admin:
        'Your account has been deleted by Admin',
      You_cant_access: "You can't access",
      this_course_anymore: 'this course anymore',
      account_deleted_by_admin: 'Account Deleted By Admin',
      search_course: 'Search course',
      top_categories: 'Top Categories',
      promos_course: 'Promo’s Course',
      free_course: 'Free course promo for you',
      trending_course: 'Trending course',
      popular_course: 'Popular course',
      participants_view_also: 'Participants view also',
      home: 'Home',
      search: 'Search',
      search2: 'Search',
      all_courses: 'All Courses',
      activity: 'Activity',
      profile: 'Profile',
      profileTabName: 'Profile',
      sar: 'SAR',
      coins: 'coins',
      // SEARCHSCREEN
      course1: 'Digital marketing',
      course2: 'Language learning',
      course3: 'Designing',

      // COURSEDETAILS
      enroll: 'enroll',
      paytabs: 'Paytabs',
      created_by: 'Created by',
      free: 'FREE',
      What_youll_learn: 'What you’ll learn',
      this_course_includes: 'This course includes',
      description: 'Description',
      curriculum: 'Curriculum',
      recommended_courses: 'Recommended courses',
      instructor: 'Instructor',
      student: 'Student',
      student_feedback: 'Student Feedback',
      course_rating: 'course rating',
      read_more: 'Read more',
      prise: 'Price',
      register: 'Register',

      // BUY_COURSE
      checkout: 'Checkout',
      summary: 'Summary',
      obtain_marks: 'Obtain Marks',
      Assignment_not_submitted: 'Assignment Not Submitted',
      original_price: 'Original Price',
      tax: 'tax',
      general_vat: 'General + vat',
      discounts: 'Discounts',
      total: 'Total :',
      payment_method: 'Payment Method',
      credit_card_details: 'Credit Card Details',
      continue_payment: 'Continue payment',

      // PURCHASESUCCESS
      purchase: 'Purchase has been done successfully',

      // COURSESSCREEN
      level2: 'Level 2',
      my_courses: 'My Courses',
      ongoing: 'Ongoing',
      completed: 'Completed',
      course_title: 'Understand what Design Thinking is all about',
      course_description: 'All can be perfect in math',
      course_Desc: 'Basic of UI/UX Designer',
      // CHATSCREEN
      course_detail: 'Course Detail',
      lectures: 'Lectures',
      chat: 'Chat',
      Quiz_Assigments: 'Quiz/Assigments',
      more_details: 'More details',
      add_message: 'Add message',
      promote_this_user: 'Promote this user',
      desc: 'Promote this user and reward 1 bonus coin',
      rewards_now: 'Rewards now',
      congrats: 'Congrats',
      bonus_point: 'Your got 1 bonus point',
      ok: 'Ok',
      user_promoted: 'You Promoted this user',

      // QUIZSCREEN

      start_now: 'Start now',
      re_attempt: 'Re Attempt',
      question: 'Question',
      please_select_on_option: 'Please select on option',
      great: 'Great',
      previous: 'Previous',
      view_answers: 'View answers',
      view_certificate: 'View certificate',
      failed: 'Failed',
      passed: 'Passed',
      result: 'Result',
      close: 'Close',
      allcorrect: 'AllCorrect',

      // BONUSMATERIALSCREEN
      document_file: 'Document File',
      video: 'Video',
      docx: 'docx',
      doc: 'doc',
      go_back: 'Go Back',
      pay_again: 'Pay Again',

      // PROGRESSREPORTSCREEN

      your_attempt: 'Your attempt quizzes with results',
      your_score: 'Your Score',

      // Profile screen
      points_progress: 'Points Progress',
      rewards_points: 'Rewards points',
      point_and_amount: 'Point and amount',
      transactions_history: 'Transactions history',
      my_notifications: 'My Notifications',
      my_favorite_courses: 'My favorite courses',
      exchange: 'Exchange',
      my_wallet: 'My wallet',
      support_agent: 'Support agent',
      my_account: 'My account',
      setting: 'Settings',
      Logout: 'Logout',

      // SupportAgent
      feedback: 'Ask us anything, or share feedback',
      how_can_we_help_you: 'How can we help you?',
      my_courses_not_showing: 'My courses not showing',
      i_have_a_question: 'I have a question',
      i_need_help_regarding_my_payment: 'I need help regarding my payment',
      i_have_a_suggestion: 'I have a suggestion',
      start_conversation: 'Start conversation',
      subject: 'Subject',
      enter_objective: 'Enter objective',
      message: 'Message',
      message_here: 'Message here',
      save: 'Save',
      add_comment: 'Add comment',

      // MYACCOUNT
      personal_details: 'Personal details',
      Name: 'Name',
      your_phone_number: 'Phone number',
      age: 'Age',
      select_gender: 'Select gender',
      select: 'Select',
      profession: 'Profession',
      gender: 'Gender',
      update: 'Update',

      // MENUSCREEN
      about_us: 'About us',
      points: 'Points',
      invitation: 'Invitation',
      invitation_rewards: 'Invitation bonuses',
      common_question: 'Common questions',
      terms_conditions: 'Terms & conditions',
      privacy_policy: 'Privacy Policy',
      help_center: 'Help center',
      invite_friends: 'Invite friends',
      points_program: 'Points Program',
      log_out: 'Logout',

      about_us_desc:
        'In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design ',
      privacy_policy_desc:
        'In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design',
      terms_conditions_desc:
        'In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design In this course we will study the initial stages of becoming a UI/UX Designer, I have several steps that I often do when I want to make a Website Design or App Design',

      // Points_Program
      points_program_desc:
        'It is a program that gives the student several points when registering for any course, the value of each point is 5 Saudi riyals. The student can exchange these points by purchasing another course within the academy, or exchange them for a sum of money after exceeding 5000 riyals or 1000 points.',
      question_one: 'How do you get points?',
      ans_one:
        'When you buy a course, you will get a set of points, which you can use as you like. Or when you help another student participating in the same course through interactive classes, the other student can give you one point equal to 5 riyals, and several students can give you these points.',
      question_two: 'How do I get points from another student?',
      ans_two:
        'Through interactive classes, you can offer a point to another student when he helps you explain a specific piece of information, and this point will be deducted from your balance. Each course is linked to an interactive class in which students participate.',
      points_balance: 'Points balance',
      points_balance_desc:
        'Each student has a balance of points, when he participates in any course that gives several points, and the student can increase his points by helping others, also other students can deduct points from him.',
      question_three: 'How do I exchange points for money?',
      ans_three:
        'After your points balance exceeds 1,000 points or 5,000 riyals, you can contact technical support to transfer this amount to your bank account.',
      question_four: 'The purpose of the points program?',
      ans_four:
        'Creating an interactive educational platform to encourage students to help each other on course topics. important note: The points program is an addition to the course. It is not obligatory for Nmo Academy to give students discounts or money. This decision will continue during the trial period. The points program is subject to the terms and conditions, which are updated periodically, please read them.',

      // COMMONQUESTION
      common_question_one: 'What type of courses does Nmo Academy offer?',
      common_ans_one:
        'Courses in the Saudi, American and global stock markets, investment funds and indices, REIT funds - crowdfunding with debt and equity, sukuk, options, digital currencie',

      // INVITESCREEN
      invite_your_friends: 'Invite your friends',
      invite_desc:
        'Refer your friends & earn up to 25% successfully message congration dummy text very benefits on your activity',
      invite_rewards: 'Your invitation gets rewards',
      invite_rewards_desc:
        'Refer your friends & earn up to 25% successfully message congration dummy text very benefits on your activity',
      invite_link: 'Invite Link',
      my_invited_rewards: 'My Invited rewards',
      lecturer: 'Lecturer',

      // INVITEPOINTSCREEN
      total_points: 'Total points',
      total_points_invitation: 'Total points',
      total_invited: 'Total invited',
      total_invited_invitation: 'Total invited',
      invited_users_rewards: 'Invited users rewards',
      got_10_point_and_youve_got_50_SAR: 'Got 10 point and you’ve got 50 SAR',
      guest: 'Guest',

      // PRIVACYSCREEN
      two_step_verification: '2 step verification',
      step_1: 'If we need to confirm it’s you, which should we try first?',
      phone_number: 'Phone Number',
      email_address: 'Email Address',
      step_2: 'When should we confirm?',
      term_1: 'When my login or activity seems risky',
      term_2: 'At every login and when my login or activity seems risky',

      // TRANSACTIONHISTORY
      filter: 'Filter',
      all: 'All',
      received_rewards: 'Rewards Received',
      sended_rewards: 'Rewards Send',
      apply: 'Apply',
      you_have_avail: 'You have Avail',
      coupon: 'Coupon Code',
      received_points: 'Received points',
      date: 'Date',
      status: 'Status',
      amount: 'Amount',
      transaction_id: 'Transaction ID',
      transaction_description: 'Transaction Description',
      user_information: 'User Information',
      billing_address: 'Billing Address',
      get_invoice: 'Get invoice',

      // LOGOUT
      logout_desc: 'Are you sure you want to logout',
      cancel: 'Cancel',
      yes_logout: 'Yes, logout',
      yes: 'Yes',
      no: 'No',

      // SETTINGSCREEN
      dark_mode: 'Dark Mode',
      language: 'Language',
      mute_notification: 'Mute Notification',
      sound: 'Sound',
      privacy: 'Privacy',
      help: 'Help',
      change_language: 'English (US)',

      // NOTIFICATION
      notifications: 'Notifications',
      course_update: 'Course update',
      view_all: 'View All',
      assignment_reminders: 'Assignment Reminders',
      event_notifications: 'Event Notifications',
      account_Notifications: 'Account Notifications',
      system_updates: 'System Updates',
      feedback_and_surveys: 'Feedback and Surveys',
      chat_engagement: 'Chat Engagement',
      progress_update: 'Progress Update',
      no_data_found: 'No data found',
      account_security: 'Account Security',
      billing: 'Billing',

      // Exchange screen
      exchange_screen: 'Exchange screen',
      get_exchange: 'Get exchange',
      select_exchange_way: 'Select Exchange Way',
      exchange_with_money: 'Exchange with money',
      exchange_with_courses: 'Exchange with courses',
      claim_now: 'Claim now',
      Please_enter_your_otp_send_to_your: 'Please enter your otp send to your',
      enter_your_otp: 'Enter your otp',
      reward_courses: 'Reward courses',
      buy_course: 'Buy Course',
      point_amount: 'Point & amount',
      total_spend: 'Total spend',
      points_spending_details: 'Points spending details',
      my_balance: 'My Balance',
      buy_now: 'Buy Now',
      withdraw: 'Withdraw',
      transaction_details: 'Transaction details',
      course_enrolled: 'Course enrolled',
      money_withdraw: 'Money withdraw',
      please_verify: 'Please Verify',
      enter_amount: 'Enter Amount',
      withdrawal_amount: 'Withdrawal Amount',
      Fees: 'Fees',
      hi_user: 'Hi',
      user: 'Bilal',
      current_amount: 'SAR',
      you_will_receive: 'You will receive',
      withdraw_desc:
        'Payment processing fees are charged by electronic payment gateways such as PayPal and credit cards.',
      confirm_withdrawal: 'Confirm Withdrawal',
      are_your_sure: 'Are your sure ?',
      your_quiz_has_been_submitted_successfully:
        'Your quiz has been submitted successfully',
      withdrawal_proceed: 'Withdrawal will be proceed',
      cancel_quiz: 'Cancel quiz',
      go_to_wallet: 'Go to wallet',
      enter_age: 'Enter age',
      invitation_reward_desc: 'Got 50 SAR and youve got 200 SAR',
      num_of_user: '20 user',
      activity_course_text: 'New UI design courses added in our',
      text: 'By confirming, this will create your account. Review our',
      conversation_champion: 'Purchase has been done successfully',
      send: 'Send',
      enter_email_address: 'Enter email address',
      enter_email: 'Enter email',
      level: 'Level 1',
      SAR_now_in_your_mobile_wallet: '250 SAR now in your mobile wallet',
      congratulations_widthdraw_via_mobile: 'Congratulations\n250 SAR',
      tax_General_vat: 'Tax : General + vat',
      Promo_code_discounts: 'Promo Code Discounts',
      cost: '$ 0',
      design_thingking: 'Design Thingking',
      course_review: 'Course Review',
      show_more: 'Show More',
      UX_reaserch: 'UX Reaserch',
      UI_design: 'UI Design',
      landing_page: 'Landing Page',
      app_design: 'App Design',
      bonus_material: 'Bonus Material',
      progress_report: 'Progress Report',
      course_feedback: 'Course Feedback',
      rate_course: 'Rate course',
      reply: 'reply',
      your_submission: 'Your submission',
      time_spending_details: 'Time spending details',
      assignment_progress: 'Assignment progress',
      quiz_progress: 'Quiz progress',
      overall_progress: 'Overall progress',
      total_time: 'Total Time',
      signup_message: 'You need to signup first',
      remaining: 'Remaining',
      total_rewards: 'Total rewards',
      ask_question: 'Ask question',
      complete_quiz: 'Complete quiz',
      done_assignments: 'Done assignments',
      view_videos: 'view videos',
      videos: 'Videos',
      assignments: 'Assignments',
      quiz: 'Quiz',
      bonus_points: 'Bonus points',
      your_feedback_has_been_submitted_successfully:
        'Your Feedback Has Been Submitted Successfully',
      thank_you: 'Thank You',
      card_number: 'Card Number',
      CVV: 'CVV',
      expired_Date: 'Expired Date',
      select_withdrawal_method: 'Select Withdrawal Method',
      go_to_home: 'Go To Home',
      withdrawal_method: 'Withdrawal Method',
      answer_correct: 'answers correct',
      point_progress: 'Point Progress',
      course_status: 'Course status',
      done: 'Done',
      log_out_title: ' Are you sure you want to Logout?',
      replies: 'Replies',
      change_password: 'Change password',
      enter_mobile_number: 'Enter Mobile Number',
      referral_code: 'Referral Code',
      reward: 'Reward',
      points_remaining: 'Remainning Points',
      replace: 'Replace',
      point: '15/15 points',
      continue_login: 'Continue login',
      your_password_has_been_reset: 'Your password has been reset',
      open_time_for_education: 'Open time for education',
      follow_up_with_the_trainee: 'Follow up with the trainee',
      availability: 'Availability 24/7',
      point_program: 'Point Program',
      accredited_certificates: 'Accredited certificates',
      professional_experts: 'Professional experts',
      comment_here: 'Comment here',
      submit: 'Submit',
      dont_have_an_account: "Don't have an account?",
      sign_up: 'Signup Now',
      sign_up_now: 'Sign up now',
      open_time_for_education_desc:
        'You can learn lesson anytime and anywhere.',
      follow_up_with_the_trainee_desc:
        'Every traning course, there is follow-up for the trainee until the course task completed.',
      availability_desc: 'Lesson are avalible 24 hours + technical support.',
      point_program_desc:
        'Help your colleagues explain any part of thematerial and earn points and exchange them for the money or purchase anyother traning course.',
      accredited_certificates_desc:
        'Each traning course is accompained by an accredited certificate',
      professional_experts_desc:
        'We bring you thebest export coachesin the field of investment',
      money_exchange: 'Money exchange',
      best_points_program_members: 'Best points program members',
      question1: 'What type of courses does Nmo Academy offer ?',
      answer1:
        'Courses in the Saudi, American and global stock markets, investment funds and indices, REIT funds - crowdfunding with debt and equity, sukuk, options, digital currencie',

      question2: 'What are the advantages of courses offered by Nmo Academy ?',
      answer2:
        'By participating in any Nmo Academy course, you get the following benefits:Access course contents from anywhere: When you subscribe to any course, you pay the subscription cost only once. You can view the course contents from anywhere and at any time.Free continuous updates: Nmo Academy courses are constantly updated to keep pace with developments. When you join any course, you will get all future updates for free without paying an additional cost until the course you joined expires.Employing a specialist with the trainee during the course: Nmo Academy employs trainers and specialized people to answer the inquiries raised by the student. A specialist is with him to follow up with him step by step until the course requirements are met.Personalized advice: After completing the course and exam (if applicable), our trainers will review your work, provide you with personalized advice and identify areas you should focus on.Providing guidance: After you finish the course, there will be tools available to you as a trainee that relate to the course you took.',

      question3:
        'Does Nmo Academy provide an accredited certificate upon completion of the course?',
      answer3:
        'Yes, it is available, but only if you pass the exam successfully.',

      question4: 'What does an accredited certificate from Nmo Academy mean?',
      answer4:
        'All certificates issued by Nmo Academy are issued only after successfully passing the exam. These are not “certificates of completion” or “certificates of attendance,” and cannot be obtained by joining the course alone. Rather, the student must pass the exam.Any certificate issued by Nmo Academy is provided in electronic form with a direct link on the academy’s website, allowing its authenticity to be verified at any time. All Nmo Academy paper certificates are stamped and have a unique code that allows verification of their authenticity from the academy’s website',

      question5:
        'Is obtaining the certificate guaranteed when I purchase the course?',
      answer5:
        'No, you must pass the exam successfully to obtain the certificate',

      question6: 'What is technical support?',
      answer6:
        'If the course includes technical support, this means that there is a dedicated employee who will be next to you to help you complete all the course tasks until you pass them. If the course does not contain a condition (technical support), this means that you will be satisfied with the contents of the course.',

      question7: 'Do I have the right to publish the course contents?',
      answer7:
        'By participating in any course, you pledge not to share any information, links, or content that was within the course anywhere and commit to keeping it for yourself only, and Nmo Academy has the right to legal accountability.',

      question8: 'How to study?',
      answer8:
        'After you purchase the course, you will receive all the login information for the study system at your email address and mobile number, and you will find the files there, and the employee assigned to serve you will contact you if the course includes technical support.',

      question9: 'What type of courses does Nmo Academy offer?',
      answer9:
        'Providing educational courses in the field of passive investments, such as: stocks - debt and equity crowdfunding - investment funds - REIT and real estate funds - index funds.',

      question10:
        'Is there an accredited certificate upon completion of the course?',
      answer10:
        'Yes, it is available, but only if you pass the exam successfully.',

      question11: 'Why should I register for academy courses?',
      answer11:
        'The courses were prepared by experts and specialists, helping you to be a successful investor, and there is a specialized team that follows up with the trainee from the first moment after participating in the course until he fulfills the course requirements and becomes a professional in it.',

      question12:
        'Do I have to commit to attending the course within a specific time frame?',
      answer12:
        'The course is available in its entirety on Nmo Academy without being bound by time limits, and you can attend it anytime you want. All lessons are recorded, and you can repeat the lesson more than once and return to it whenever you want if you need to. Our coaches are always available and will follow up with you and answer your questions at your own pace.',

      question13: 'How much time do I have to access the course contents?',
      answer13:
        'Each training course has a specific time that allows the subscriber to access it for a period of not less than 3 months to an indefinite period, during which you can access the course content and benefit from technical support. Nmo Academy’s courses are expanded, they are constantly being added to and updated. They are not brief mini-courses. By joining any course, you will get full access to it according to the time period and to all future updates and additions to it.',

      question14:
        'I have a question about one of the lessons and I encountered a problem that I do not know how to solve. What should I do?',
      answer14:
        'We provide an expert team with excellent technical experience to answer students’ inquiries and solve their problems. You can tell them your problem and the team will contact you to help you solve it.',

      enter_your_amount: 'Enter your amount',
      select_profession: 'Select Profession',
      male: 'Male',
      female: 'Female',
      all_notifications: 'All Notification',
      min_ago: 'min ago',
      Minutes: 'Minutes',
      hours_ago: 'hours ago',
      other: 'Other',
      professor: 'Professor',
      teacher: 'Teacher',
      format: 'Format',
      title: 'Title',
      ppt: 'Ppt',
      marks: 'Marks',
      meeting_link: 'Meeting link',
      lecturua: 'Lecturua',
      withdrawal_has_been_done_successfully:
        'Withdrawal has been done successfully',
      withdrawal_request_has_been_done_successfully_to_admin:
        'withdrawal request has been done successfully to admin',
      widthdraw_desc:
        'After continue payment the admin will see your account detail and then admin will send amount to your account',
      enetr_your_email: 'Enter your email',
      register_now: 'Register now',
      confirm_password: 'Confirm password ',
      confirm_new_password: 'Confirm new password',
      enter_your_passowrd: 'Enter your passowrd',
      e_mail: 'E-mail',
      guider: 'Guider',
      new_password: 'New password',
      referrals: 'Referrals',
      make_selection: 'Make Selection',
      continue_via_mail: 'Continue via mail',
      continue_via_mobile: 'Continue via sms',
      create_your_new_password_so_you_can_share_your_memories_again:
        'Create your new password so you can share your memories again',
      enter_old_password: 'Enter Old Password',
      enter_confirm_password: 'Enter Confirm Password',
      enter_password: 'Enter Password',
      password_changed: 'Password changed!',
      back_to_login: 'Back to Login',
      last_updated: 'Last updated',
      english_usa: 'English, USA',
      total_hours: '7 total hours',
      see_answers: 'See Answers',
      full_time_access: 'Full time access',
      supported_files: 'Supported files',
      certificate_of_completion: 'Certificate of completion',
      degree: 'MBA degree',
      course_intro: 'Course Intro',
      award_winner: 'Award winner',
      course: 'Course',
      file_excel: 'Excel',
      pdf: 'Pdf',
      go_to_course: 'Go to course',
      section: 'Section',
      number_of_points: 'Number of points',
      time: '25 min',
      Please_Select_Your_Assignment_File: 'Please Select Your Assignment File',
      Quiz_Is_Not_Complete_Yet: 'Quiz And Assignment Is Not Completed Yet',
      continue_widthdraw: 'Continue',
      just_now: 'just now',
      quiz_will_be_general_knowledge_question_and_description:
        'Quiz will be general knowledge question and description',
      $: '$',
      access_on_mobile_desktop: 'Access on mobile',
      intuitively_create_more_design_work_ever_before_you_learn:
        'Intuitively create more design work ever before you learn',
      Dont_worry_well_let_you_know_if_theres_a_problem_with_your_account:
        " Don't worry, we'll let you know if there's a problem with your account",
      cancel_quiz_will_be_enable_to_proceed_again:
        'Cancel quiz will be enable to proceed again',
      reset_password: 'Reset Password',
      enter_new_password: 'Enter new Password',
      confirm_your_password: 'Confirm your password',
      enter_valid_OTP_code: 'Enter valid OTP code',
      phone_number_is_empty: 'Phone number is empty',
      enter_valid_email_address: 'Enter valid email ddress',
      seconds: 'Seconds',

      please_enter_your_name: 'Please enter your name',
      that_doesnt_look_like_a_phone_number:
        "That doesn't look like a phone number",
      a_phone_number_cant_start_with_a_minus:
        "A phone number can't start with a minus",
      a_phone_number_cant_include_a_decimal_point:
        "A phone number can't include a decimal point",
      a_phone_number_is_required: 'A phone number is required',
      please_enter_your_email_address: 'Please enter your email address',
      please_enter_your_password: 'Please enter your Password',
      password_must_be_at_least_8_characters:
        'Password must be atleast 8 characters',
      invalid_name: 'Invalid name',
      invalid_email: 'invalid email',
      personal_information: 'Personal Information',
      please_enter_valid_phone_number: 'Please enter valid phone number',
      please_enter_your_old_password: 'please enter your old password',
      share_to_chat: 'Share to chat',
      upload_Document: 'Upload Document',
      upload_your_files_here: 'Upload your files here',
      due_date: 'Due Date',

      // Supporting KeyWords
      user_not_verified: 'User Not Verified',
      please_resend_your_otp_and_verify_its_you:
        'Please resend your otp and verify its you',
      number_of_attempted_quiz: 'Number of attempted quiz',
      Account_already_exist_sign_in_please:
        'Account already exist sign in please',
      account_already_existed: 'Account Already Existed',
      please_login: 'Please Login',
      course_access_denied: 'Course Access Denied',
      You_cannot_access_this_course_because_thet_ime_duration_has_been_completed:
        'You cannot access this course because the time duration has been completed.',
      your_password_is_changed_by_Admin: 'Your password is changed by Admin',
      cant_access_this_course: "Can't Access This Course",
      you_arent_enrolled_in_this_course: "You aren't enrolled in this course",
      something_went_wrong_server_error: 'Something Went Wrong, Server Error',
      out_of: 'out of',
      mcqs: 'Mcq’s answers correct',
      task: 'Task',
      type: 'Type',
      ramaning_days: 'Remaining days',
      duration: 'Duration',
      question_answers: 'Mcq’s question & answers',
      new_courses: 'New courses',
      termsAndconditions: 'Terms And Conditions',
      parties: 'The Parties',
      termsCondition_Description:
        "Nmo Academy is an educational platform that offers training courses in the field of investments, available for purchase subject to agreement to all terms, conditions, policies, and notices.The parties to the agreement are Nmo Academy (the first party) and the user (the second party). Nmo Academy and the user are collectively referred to as the Parties and individually as Party Nmo Academy reserves the right to change or update the terms and conditions at any time, whether partially or completely. The user cannot claim or acknowledge that they were not notified of the changes and updates by Nmo Academy, or that they cannot be applied to the user. If the user is directly notified by Nmo Academy and the user uses the services on the Nmo Academy website directly or indirectly after the changes it is the user's responsibility to periodically review this agreement and the privacy policy.",
      agreementStatus: 'Agreement Status',
      agreementStatus_desc:
        'When the user enters the Nmo Academy website and registers, this agreement is created and enters into force. Both parties are considered to have agreed to be legally bound by it, and the user is considered to have read, understood, and confirmed this agreement After this Agreement is created, it will remain in effect during the time the User accesses the Nmo Academy Services.The User must agree and ensure that complete, accurate and up-to-date information is provided when the User registers with Nmo Academy.',
      age_or_category_requirement: 'Age or category requirement',
      age_or_category_requirement_desc:
        'When the user enters the Nmo Academy website and registers, this agreement is created and enters into force. Both parties are considered to have agreed to be legally bound by it, and the user is considered to have read, understood, and confirmed this agreement.',
      privacy_desc:
        'In no case does the user have the right to allow third parties to use his account information or any other permissions on the Nmo Academy website, whether permanently or temporarily. Otherwise, Nmo Academy may permanently or temporarily suspend the account of the user concerned.The User is solely responsible for the consequences of allowing third parties to use his account.The User must agree and warrant that his or her account information will not be shared with any third party. Nmo Academy shall not be liable for any damage, loss, cost and any other negative consequence arising from such unauthorized use. Along with this Agreement, the User agrees to confirm the Privacy Policy and, accordingly, the User ensures compliance with this Agreement, the Privacy Policy and any other rules and regulations of Nmo Academy and applicable laws while using Nmo Academy’s services. In this regard, the User must agree to be solely responsible for his or her actions. In no case may a lawsuit be filed against Nmo Academy, and the procedures referred to do not bear any responsibility on Nmo Academy. In addition, in such a case, the user must agree to indemnify Nmo Academy and any third party against any damage, loss or cost.',
      the_use: 'The use',
      the_use_desc:
        'The user agrees not to violate, reverse engineer, disassemble or otherwise exploit the Nmo Academy website, its contents or services.While using the Nmo Academy services and contents, the user agrees and warrants not to transmit, publish, display, save, send, forward, store or provide access to any content that is construed as illegal, harmful, offensive or interference in the private lives of others, other than Therefore, the user is responsible for his actions and Nmo Academy reserves the right to remove any such materials from the platform without any notice.In cases where the user violates the above-mentioned terms, the user’s account will be permanently or temporarily suspended and the user may be deprived of access to the services or contents of Nmo Academy even if he pays sums of money. If the official authorities request this, Nmo Academy must disclose the contents that have been reported. Created by the user, which violates the above clause.The user may not use Nmo Academy services for any illegal or unauthorized purpose.',
      nmo_academy_services: 'Nmo Academy Services',
      nmo_academy_services_desc:
        'After receiving the request, the user will have 24 hours to access the contents of Nmo Academy and participate and discuss throughout his subscription period.The user has the right to request an amendment to his personal account information with us or transfer it to his other email or mobile number.Nmo Academy reserves the right to refuse service for any reason at any time.Nmo Academy is unable to publish methods and tactics for any illegal electronic marketing for any product or service that is religiously and ',
      disclaimer: 'Disclaimer',
      disclaimer_desc:
        'The nature of the training courses offered at Nmo Academy is risky, and the participant in any course bears all losses if they occur, and Nmo Academy does not bear any responsibility.',
      Amendments_to_your:
        'Amendments to your personal account on the Nmo Academy website',
      Amendments_to_your_desc:
        'We reserve the right at any time to modify or discontinue the Service to you (or any part or content thereof) without notice at any time.We will not be liable to the User or to any third party for any modification, price change, suspension or discontinuance of the Service.',
      paying_off: 'Paying off',
      paying_off_desc:
        'The user must maintain the confidentiality of the information entered upon payment, and Nmo Academy disclaims responsibility for any damage.The user has the right to recover the amount before officially accessing the course contents using his mobile number or email.The user cannot request a refund after entering the course contents.',
      teacher_not_assign_your_marks: 'The test is under review',
      already_have_an_account: 'Already have an account?',
      please_enter_your_phoneNo_with_country_code:
        'Please enter your phone number with country code',
      totalSpend: 'Total spend',
      mcq: 'Mcq’s question & answers:',
      Empty_List: 'There are no courses in this category.',
      files: 'Files',

      use_coins_to_buy: 'Do you want to use your SAR to buy this course?',
      new_price_after_coins: 'Now your price for this course is SAR',

      alert_use_coins_title:
        'Do you want to use your {{my_coin}} SAR to buy this course?',
      alert_use_coins_message:
        'Now your price for this course is {{price}} SAR',
      quiz_not_complete: 'Quiz Is Not Complete Yet',
      mcq_question_answers: 'MCQ’s Question & Answers',

      software_developer: 'Software Developer',
      data_scientist: 'Data Scientist',
      digital_marketer: 'Digital Marketer',
      graphic_designer: 'Graphic Designer',
      project_manager: 'Project Manager',
      marketing_specialist: 'Marketing Specialist',
      business_analyst: 'Business Analyst',
      civil_engineer: 'Civil Engineer',
      mechanical_engineer: 'Mechanical Engineer',
      electrical_engineer: 'Electrical Engineer',
      nurse: 'Nurse',
      doctor: 'Doctor',
      pharmacist: 'Pharmacist',
      lawyer: 'Lawyer',
      accountant: 'Accountant',
      financial_analyst: 'Financial Analyst',
      architect: 'Architect',
      interior_designer: 'Interior Designer',
      human_resources_manager: 'Human Resources Manager',
      customer_service_representative: 'Customer Service Representative',
      sales_manager: 'Sales Manager',
      event_planner: 'Event Planner',
      journalist: 'Journalist',
      writer: 'Writer',
      translator: 'Translator',
      chef: 'Chef',
      hotel_manager: 'Hotel Manager',
      pilot: 'Pilot',
      flight_attendant: 'Flight Attendant',
      police_officer: 'Police Officer',
      firefighter: 'Firefighter',
      social_worker: 'Social Worker',
      research_scientist: 'Research Scientist',
      biologist: 'Biologist',
      chemist: 'Chemist',
      physicist: 'Physicist',
      data_analyst: 'Data Analyst',
      enter_your_profession: 'Enter Your Profession',
      reason: 'Reason',
      correct: 'Correct',
      wrong: 'Wrong',
      options: 'Options',
      answers_correct: 'Mcq’s answers correct',
      noVideoInSection: 'No video in this section',
      continue_with_apple: 'Continue with Apple',
    },
  },

  ar: {
    translation: {
      continue_with_apple: 'تابع باستخدام Apple',

      options: 'خيارات',
      correct: 'صحيح',
      wrong: 'خطأ',
      reason: 'سبب',
      noVideoInSection: 'لا يوجد فيديو في هذا القسم',
      enter_your_profession: 'أدخل وظيفتك',
      software_developer: 'مطور برمجيات',
      data_scientist: 'عالم بيانات',
      digital_marketer: 'مسوق رقمي',
      graphic_designer: 'مصمم جرافيك',
      project_manager: 'مدير مشاريع',
      marketing_specialist: 'أخصائي تسويق',
      business_analyst: 'محلل أعمال',
      civil_engineer: 'مهندس مدني',
      mechanical_engineer: 'مهندس ميكانيكي',
      electrical_engineer: 'مهندس كهربائي',
      nurse: 'ممرضة',
      doctor: 'طبيب',
      pharmacist: 'صيدلي',
      lawyer: 'محامي',
      accountant: 'محاسب',
      financial_analyst: 'محلل مالي',
      architect: 'مهندس معماري',
      interior_designer: 'مصمم داخلي',
      human_resources_manager: 'مدير الموارد البشرية',
      customer_service_representative: 'ممثل خدمة العملاء',
      sales_manager: 'مدير مبيعات',
      event_planner: 'مخطط فعاليات',
      journalist: 'صحفي',
      writer: 'كاتب',
      translator: 'مترجم',
      chef: 'طاه',
      hotel_manager: 'مدير فندق',
      pilot: 'طيار',
      flight_attendant: 'مضيف طيران',
      police_officer: 'ضابط شرطة',
      firefighter: 'رجل إطفاء',
      social_worker: 'عامل اجتماعي',
      research_scientist: 'عالم أبحاث',
      biologist: 'عالم أحياء',
      chemist: 'كيميائي',
      physicist: 'فيزيائي',
      data_analyst: 'محلل بيانات',

      mcq_question_answers: 'أسئلة الاختيار من متعدد وإجاباتها',
      quiz_not_complete: 'لم يكتمل الاختبار بعد',
      alert_use_coins_title:
        'هل تريد استخدام {{my_coin}} ريال سعودي لشراء هذه الدورة؟',
      alert_use_coins_message: 'الآن سعر هذه الدورة هو {{price}} ريال سعودي',

      use_coins_to_buy: 'هل تريد استخدام  ريال سعودي لشراء هذه الدورة؟',
      new_price_after_coins: 'الآن سعر هذه الدورة هو  ريال سعودي',

      Empty_List: 'لا توجد دورات في هذه الفئة.',
      mcq: 'أسئلة وأجوبة Mcq:',
      parties: 'الأطراف',
      termsCondition_Description:
        'أكاديمية نمو هي عبارة عن منصة تعليمية تقدم دورات تدريبية في مجال الاستثمارات، وتتاح للشراء بشرط موافقته على جميع الشروط والأحكام والسياسات والإشعارات. أطراف الاتفاقية هم أكاديمية نمو (الطرف الأول) والمستخدم (الطرف الثاني) يشار إلى أكاديمية نمو والمستخدم باسم “الأطراف” بشكل جماعي و“الطرف” بشكل فردي. يحق لأكاديمية نمو تغيير أو تحديث الشروط والأحكام في أي وقت، سواء كان ذلك جزئيًا أو كليًا. لا يجوز للمستخدم المطالبة أو الإقرار بأنه لم يتم إخطاره بالتغييرات والتحديثات بواسطة أكاديمية نمو، أو أن لا يمكن تطبيقها على المستخدم. إذا تم إخطار المستخدم مباشرة من قبل أكاديمية نمو وقام المستخدم بالاستفادة من الخدمات في موقع أكاديمية نمو بشكل مباشر أو غير مباشر بعد إجراء التغييرات، يقع على عاتق المستخدم مسؤولية التحقق من هذه الاتفاقية وسياسة الخصوصية بشكل دوري.',
      age_or_category_requirement: 'متطلبات العمر أو الفئة',
      agreementStatus: 'حالة الاتفاق',
      agreementStatus_desc:
        'عندما يقوم المستخدم بدخول موقع أكاديمية نومو ويقوم بالتسجيل، يتم إنشاء هذا الاتفاق ويدخل حيز التنفيذ. يُعتبر كلا الطرفين وافقا على أن يكونا ملزمين قانونيًا به، ويُعتبر المستخدم قد قرأ وفهم وأكد هذا الاتفاق بعد إنشائه، وسيظل هذا الاتفاق ساري المفعول أثناء فترة وصول المستخدم إلى خدمات أكاديمية نومو. يجب على المستخدم الموافقة والتأكد من تقديم معلومات كاملة ودقيقة وحديثة عند التسجيل مع أكاديمية نومو.',
      age_or_category_requirement_desc:
        'عندما يدخل المستخدم إلى موقع أكاديمية نومو ويقوم بالتسجيل، يتم إنشاء هذه الاتفاقية وتدخل حيز التنفيذ. ويعتبر الطرفان قد وافقا على الالتزام قانونًا بها، ويعتبر المستخدم قد قرأ هذه الاتفاقية وفهمها وأكدها.',
      the_use: 'الاستخدام',
      the_use_desc:
        'يوافق المستخدم على عدم انتهاك أو إجراء هندسة عكسية أو تفكيك أو استغلال الموقع الإلكتروني لأكاديمية نمو أو محتوياته أو خدماته. أثناء استخدام خدمات ومحتويات أكاديمية نمو، يوافق المستخدم ويضمن عدم نقل أو نشر أو عرض أو حفظ أو إرسال أو إعادة توجيه أو تخزين أو توفير الوصول إلى أي محتوى يتم تفسيره على أنه غير قانوني أو ضار أو مسيء أو تدخل في الحياة الخاصة للآخرين، بخلاف ذلك، يكون المستخدم مسؤولاً عن أفعاله وتحتفظ أكاديمية نمو بالحق في إزالة أي من هذه المواد من المنصة دون أي إشعار. وفي الحالات التي ينتهك فيها المستخدم الشروط المذكورة أعلاه، سيتم إيقاف حساب المستخدم بشكل دائم أو مؤقت وقد يتم حرمان المستخدم من الوصول إلى خدمات أو محتويات أكاديمية نمو حتى لو قام بدفع مبالغ مالية. وفي حالة طلب الجهات الرسمية ذلك، يجب على أكاديمية نمو الإفصاح عن المحتويات التي تم الإبلاغ عنها. تم إنشاؤها من قبل المستخدم، وهو ما ينتهك البند أعلاه. لا يجوز للمستخدم استخدام خدمات أكاديمية نومو لأي غرض غير قانوني أو غير مصرح به.',
      privacy_desc:
        'ولا يحق للمستخدم بأي حال من الأحوال السماح لأطراف ثالثة باستخدام معلومات حسابه أو أي أذونات أخرى على موقع أكاديمية نمو، سواء بشكل دائم أو مؤقت. وبخلاف ذلك، يجوز لأكاديمية نمو تعليق حساب المستخدم المعني بشكل دائم أو مؤقت. يتحمل المستخدم وحده المسؤولية عن عواقب السماح لأطراف ثالثة باستخدام حسابه. يجب أن يوافق المستخدم ويضمن عدم مشاركة معلومات حسابه مع أي طرف ثالث. لن تكون أكاديمية نمو مسؤولة عن أي ضرر أو خسارة أو تكلفة أو أي نتيجة سلبية أخرى تنشأ عن هذا الاستخدام غير المصرح به. إلى جانب هذه الاتفاقية، يوافق المستخدم على تأكيد سياسة الخصوصية، وبالتالي يضمن المستخدم الامتثال لهذه الاتفاقية وسياسة الخصوصية وأي قواعد وأنظمة أخرى خاصة بأكاديمية نمو والقوانين المعمول بها أثناء استخدام خدمات أكاديمية نمو. وفي هذا الصدد، يجب على المستخدم الموافقة على تحمل المسؤولية الوحيدة عن أفعاله. لا يجوز بأي حال من الأحوال رفع دعوى قضائية ضد أكاديمية نمو، ولا تحمل الإجراءات المشار إليها أي مسؤولية على أكاديمية نمو. بالإضافة إلى ذلك، في مثل هذه الحالة، يجب على المستخدم الموافقة على تعويض أكاديمية نومو وأي طرف ثالث ضد أي ضرر أو خسارة أو تكلفة',
      nmo_academy_services: 'خدمات أكاديمية نمو',
      nmo_academy_services_desc:
        'بعد استلام الطلب، سيكون أمام المستخدم 24 ساعة للوصول إلى محتويات أكاديمية نمو والمشاركة والمناقشة طوال فترة اشتراكه. يحق للمستخدم طلب تعديل معلومات حسابه الشخصي لدينا أو نقلها إلى بريده الإلكتروني أو رقم جواله الآخر. تحتفظ أكاديمية نمو بالحق في رفض الخدمة لأي سبب في أي وقت. أكاديمية نمو غير قادرة على نشر أساليب وتكتيكات أي تسويق إلكتروني غير قانوني لأي منتج أو خدمة ذات طابع ديني وديني',
      disclaimer: 'تنصل',
      disclaimer_desc:
        'طبيعة الدورات التدريبية المقدمة في أكاديمية نمو محفوفة بالمخاطر، ويتحمل المشارك في أي دورة كافة الخسائر في حال حدوثها، ولا تتحمل أكاديمية نمو أي مسؤولية.',
      Amendments_to_your: 'تعديلات على حسابك الشخصي على موقع أكاديمية نمو',
      paying_off: 'الدفع',
      paying_off_desc:
        'يجب على المستخدم الحفاظ على سرية المعلومات المدخلة عند الدفع، وتخلي أكاديمية نمو مسؤوليتها عن أي ضرر. يحق للمستخدم استرداد المبلغ قبل الدخول رسميًا إلى محتويات الدورة باستخدام رقم هاتفه المحمول أو بريده الإلكتروني. لا يمكن للمستخدم طلب استرداد الأموال بعد إدخال محتويات الدورة.',
      Amendments_to_your_desc:
        'نحن نحتفظ بالحق في تعديل أو إيقاف الخدمة المقدمة لك (أو أي جزء أو محتوى منها) في أي وقت دون إشعار في أي وقت. لن نكون مسؤولين تجاه المستخدم أو تجاه أي طرف ثالث عن أي تعديل أو تغيير في السعر أو تعليق أو إيقاف الخدمة.',
      upload_Document: ' تحميل الوثيقة',
      upload_your_files_here: 'قم بتحميل ملفاتك هنا',
      create_your_new_password_so_you_can_share_your_memories_again:
        'قم بإنشاء كلمة المرور الجديدة الخاصة بك حتى تتمكن من مشاركة ذكرياتك مرة أخرى',
      // AUTH FLOW
      english_usa: 'الإنجليزية الولايات المتحدة الأمريكية',
      award_winner: 'الفائز بالجائزة',
      register_now: 'سجل الآن',
      course: 'دورة',
      just_now: 'الآن',
      due_date: 'تاريخ الاستحقاق',
      pdf: 'ملف',
      ppt: 'جزء لكل تريليون',
      quiz_will_be_general_knowledge_question_and_description: '',
      please_enter_valid_phone_number: 'الرجاء إدخال رقم هاتف صحيح',
      time: '25 دقيقة',
      Please_Select_Your_Assignment_File:
        'براہ کرم اپنی اسائنمنٹ فائل کو منتخب کریں',
      Quiz_Is_Not_Complete_Yet: 'الاختبار والواجب لم يكتمل بعد',
      $: 'ريال',
      share_to_chat: 'شارك للدردشة',
      section: 'الفصل',
      file_excel: 'ملف',
      go_to_course: 'اذهب إلى الدورة',
      course_intro: 'مقدمة الدورة',
      degree: 'درجة الماجستير في إدارة الأعمال',
      certificate_of_completion: 'شهادة',
      access_on_mobile_desktop: 'الوصول على الهاتف المحمول',
      full_time_access: 'متاحة دائما',
      total_hours: 'إجمالي 7 ساعات',
      supported_files: 'الملفات المدعومة',
      intuitively_create_more_design_work_ever_before_you_learn:
        'قم بإنشاء المزيد من أعمال التصميم بشكل حدسي قبل أن تتعلم',
      last_updated: 'آخر تحديث ',
      course_enrolled: 'تم التسجيل في الدورة',
      confirm_password: 'تأكيد كلمة المرور',
      confirm_new_password: 'تأكيد كلمة المرور الجديدة',
      enter_your_passowrd: ' أدخل كلمة المرور الخاصة بك',
      enter_old_password: 'أدخل كلمة المرور القديمة',
      enter_password: 'أدخل كلمة المرور',
      password_changed: 'تم تغيير كلمة السر!',
      Dont_worry_well_let_you_know_if_theres_a_problem_with_your_account:
        'لا تقلق، سنخبرك إذا كانت هناك مشكلة في حسابك',
      enter_confirm_password: 'أدخل تأكيد كلمة المرور',
      back_to_login: 'العودة لتسجيل الدخول',
      e_mail: 'البريد الإلكتروني',
      please_enter_your_name: 'من فضلك أدخل إسمك',
      that_doesnt_look_like_a_phone_number: 'هذا لا يبدو كرقم هاتف',
      a_phone_number_cant_start_with_a_minus:
        'لا يمكن أن يبدأ رقم الهاتف بعلامة السالب',
      a_phone_number_cant_include_a_decimal_point:
        'لا يمكن أن يتضمن رقم الهاتف علامة عشرية',
      a_phone_number_is_required: 'مطلوب رقم الهاتف',
      see_answers: 'شاهد الاجوبة',
      please_enter_your_email_address: 'الرجاء إدخال عنوان بريدك الإلكتروني',
      invalid_name: 'اسم غير صالح',
      invalid_email: 'بريد إلكتروني غير صالح',
      please_enter_your_password: 'الرجاء إدخال كلمة المرور',
      password_must_be_at_least_8_characters:
        'يجب أن تتكون كلمة المرور من 8 أحرف على الأقل',
      // SPLASH SCREEN
      select_language: 'اختار اللغة',
      enter_valid_OTP_code: 'أدخل رمز OTP صالحًا',
      phone_number_is_empty: 'رقم الهاتف فارغ',
      enter_valid_email_address: 'أدخل عنوان بريد إلكتروني صالحًا',
      english: 'إنجليزي',
      arabic: 'العربية',
      view_result: 'عرض النتائج',
      reset_password: 'إعادة تعيين كلمة المرور',
      enter_new_password: 'أدخل كلمة المرور الجديدة',
      confirm_your_password: 'أكد رقمك السري',
      continue: 'متابعة',
      enter_your_name: 'أدخل أسمك',
      email_verification: 'أدخل بريدك الإلكتروني المسجل',
      sms_verification: 'أدخل رقمك المسجل',
      continue_login: 'متابعة تسجيل الدخول',
      your_password_has_been_reset: 'تم إعادة تعيين كلمة المرور الخاصة بك',
      // OnboardingSCREEN1
      level2: 'المستوي',
      Onboarding_heading1:
        'اسأل، ساعد، اكسب : من خلال الفصول التفاعلية و نقاط المكافآت',
      Onboarding_text1:
        ' ساعد زملائك و اكسب النقاط من خلال برنامج النقاط الخاص بنا! تستطيع استبدال النقاط نقداً أو شراء دورات تدريبية .. ابدأ في كسب النقاط الآن',

      // OnboardingSCREEN2
      Onboarding_heading2: 'ارفع مستوى معرفتك الاستثمارية مع أكاديمية نمو',
      Onboarding_text2:
        'ارفع مستوى معرفتك الاستثمارية من خلال الدورات التدريبية التي يقدمها الخبراء في أكاديمية نمو',
      skip: 'تخطى',
      next: 'التالي',
      change_password: 'تغيير كلمة المرور',

      // SignUpScreen
      heading: 'سجل الآن',
      continue_with_google: 'الدخول باستخدام Google',
      continue_with_mail: 'الدخول باستخدام الايميل',
      continue_with_mobile: 'الدخول باستخدام رقم الهاتف',

      // COMMON KEYS
      Lets_sign_in: 'تسجيل الدخول',
      enter_your_phone_number: 'سوف يصلك رمز التأكيد',
      send_verification_code: 'إرسال رمز التحقق',
      skip_now: 'تخطى',
      enter_mobile_number: 'ادخل رقم الجوال',
      referral_code: 'كود الإحالة',
      seconds: 'ثواني',
      enter_otp_code: 'أدخل رمز OTP',
      otp_text:
        'تم إرسال الرمز المكون من 4 أرقام إلى جوالك. تحقق من الرمز وأدخله هنا.',
      didnt_get_otp: 'إعادة إرسال رمز التحقق؟',
      otp: 'مكتب المدعي العام',
      resend: ' إعادة إرسال',
      confirm: 'تأكيد',
      header_text: 'تسجيل الدخول ب',
      congratulations: 'تهانينا',
      account_registered: 'لقد تم تسجيل حسابك',
      go_to_courses: 'اذهب إلى الدورات',
      login: 'تسجيل الدخول',
      conversation_champion: 'لقد تمت عملية الشراء بنجاح',

      continue_with_email: 'تواصل مع البريد الإلكتروني',
      email: 'تواصل مع البريد الإلكتروني الخاص بك',
      enter_your_email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      enter_your_password: 'ادخل رقمك السري',
      forgot_password: 'هل نسيت كلمة السر ؟',
      new_password: 'كلمة المرور الجديدة',
      sign_in: 'تسجيل الدخول',
      or: 'أو مشاركة',
      sign_in_with: 'اختار اللغة',
      welcome: 'اختار اللغة',
      name: 'الاسم',
      enter_full_name: 'أدخل الاسم الكامل',
      your_name: 'اسمك',
      enter_name: 'بلال',
      your_email: 'بريدك الالكتروني',
      enter_mail: 'أدخل بريدك الإلكتروني',
      terms: 'الأحكام',
      and: 'و',
      conditions: 'شروط',
      text: 'من خلال التأكيد، سيؤدي هذا إلى إنشاء حسابك. قم بمراجعة الشروط والأحكام الخاصة بنا',
      hi_user: 'مرحبا',
      guest: 'بك',

      // HOMESCREEN
      find_course: 'ابحث عن الدورات',
      your_account_has_been_deleted_by_admin: 'لقد تم حذف حسابك من قبل المشرف',
      You_cant_access: 'لا يمكنك الوصول',
      this_course_anymore: 'هذه الدورة بعد الآن',
      account_deleted_by_admin: 'تم حذف الحساب من قبل المشرف',
      search_course: 'بحث',
      top_categories: 'التصنيفات',
      promos_course: 'الأعلى مبيعاً',
      free_course: 'دورات تم شرائها بكثافة',
      trending_course: 'الأسهم و الاستثمار',
      popular_course: 'الشهادات المهنية',
      participants_view_also: 'شاهد المستخدمين هذه الدورات',
      home: 'الرئيسية',
      search: 'بحث',
      search2: 'اكتشف',
      all_courses: 'كل الدورات',
      activity: 'الاشعارات',
      profile: 'حسابي',
      profileTabName: 'حسابي',
      sar: 'ريال سعودي',
      // sar: 'SAR',
      coins: 'نقطة',
      // SEARCHSCREEN
      course1: 'اللغةاختار اللغة',
      course2: 'اللغةاختار اللغة',
      course3: 'اللغةاختار اللغة',

      // COURSEDETAILS
      enroll: 'تسجيل',
      paytabs: 'بي تابز',
      created_by: 'انشأ من قبل',
      free: 'سجل الآن',
      What_youll_learn: 'ماذا ستتعلم',
      this_course_includes: 'تتضمن هذه الدورة',
      description: 'الوصف',
      curriculum: 'الفصول',
      recommended_courses: 'الدورات المقترحة',
      instructor: 'المدرب',
      student: 'طالب',
      student_feedback: 'التقييم',
      course_rating: 'تقييم الدورة',
      read_more: 'اقرأ أكثر',
      prise: 'السعر',
      register: 'سجل',
      current_amount: 'SAR',

      // BUY_COURSE
      checkout: 'الدفع',
      summary: 'ملخص',
      obtain_marks: 'الحصول على علامات',
      Assignment_not_submitted: 'لم يتم تقديم المهمة',
      original_price: 'السعر الأساسي :',
      tax: 'اللغة',
      general_vat: ' اللغةاختار اللغة',
      discounts: 'الخصومات : ',
      total: ' المجموع :',
      payment_method: 'طريقة الدفع او السداد:',
      credit_card_details: 'اللغةاختار اللغة',
      continue_payment: 'متابعة الدفع',
      tax_General_vat: 'ضريبة القيمة المضافة',
      Promo_code_discounts: 'خصومات الرمز الترويجي',
      cost: '0 ريال سعودي',
      signup_message: 'يجب عليك التسجيل أولاً',
      // PURCHASESUCCESS
      purchase: 'لقد تمت عملية الشراء بنجاح',

      // COURSESSCREEN
      my_courses: 'دوراتي',
      ongoing: 'مفتوح',
      completed: 'مكتمل',

      // CHATSCREEN
      course_detail: 'تفاصيل الدورة',
      lectures: 'الدروس',
      chat: 'الدردشة',
      Quiz_Assigments: 'الاختبارات و الواجبات',
      bonus_material: 'المرفقات',
      progress_report: 'التقدم',
      course_feedback: 'التقييم',
      rate_course: 'قيم الدورة',
      your_submission: 'التقديم الخاص بك',
      more_details: 'اللغةاختار اللغة ',
      add_message: 'اللغةاختار اللغة ',
      promote_this_user: 'امنح نقطة مكاقئة',
      desc: 'قم بترويج هذا المستخدم ومكافأة عملة إضافية واحدة',
      rewards_now: 'إرسال',
      congrats: 'مبروك',
      bonus_point: 'لقد حصلت على نقطة إضافية واحدة',
      ok: 'تمام',
      user_promoted: 'اللغةاختار اللغة',
      replies: 'الردود',
      thank_you: 'شكرًا لك',
      card_number: 'رقم البطاقة',
      CVV: 'سي في في',
      expired_Date: 'منتهي الصلاحية',
      select_withdrawal_method: 'حدد طريقة السحب',
      withdrawal_method: 'طريقة السحب',
      answer_correct: 'الإجابة الصحيحة',
      your_feedback_has_been_submitted_successfully:
        'لقد تم إرسال تقييمك بنجاح',
      reward_point: 'نقطة مكافأة',
      no_chat_found: 'لم يتم العثور على محادثة حتى الآن',
      no_result_founds: 'لم يتم العثور على نتيجة',
      // QUIZSCREEN

      start_now: 'ابدأ الآن',
      re_attempt: 'إعادة المحاولة',
      question: 'السؤال رقم',
      please_select_on_option: 'يرجى تحديد الخيار',
      great: 'عظيم',
      previous: 'السابق',
      view_answers: 'عرض الإجابات',
      view_certificate: 'عرض الشهادة',
      failed: 'عدم الاجتياز',
      passed: 'نجاح',
      result: 'نتيجة',
      close: 'يلغي',

      // BONUSMATERIALSCREEN
      document_file: 'اللغةاخت',
      video: 'فيديو',
      docx: 'مستندات',
      doc: 'مستندات',
      goBack: 'اللغةاخت',
      // PROGRESSREPORTSCREEN

      your_attempt: 'نتائج الاختبارات',

      // Profile screen
      your_score: 'درجاتك',
      points_progress: 'اللغةاختار اللغة',
      rewards_points: 'نقاط المكافآت',
      point_and_amount: 'برنامج النقاط',
      transactions_history: 'المعاملات',
      my_notifications: 'الإشعارات الخاصة بي',
      my_favorite_courses: 'الدورات المفضلة',
      exchange: 'الاستبدال',
      my_wallet: 'محفظتي',
      support_agent: 'الدعم الفني',
      my_account: 'حسابي',
      setting: 'الإعدادات',
      Logout: 'تسجيل الخروج',
      point_progress: 'تقدم النقط',
      course_status: 'إحصائيات الدورة',

      delete_aaccount: 'حذف الحساب',
      delete_aaccount_title:
        'سيؤدي حذف حسابك إلى مسح جميع بياناتك وإعداداتك بشكل دائم.',
      // SupportAgent
      feedback: 'اسألنا أي شيء، أو مشاركة ردود الفعل',
      how_can_we_help_you: 'كيف يمكننا مساعدتك؟',
      my_courses_not_showing: 'عندي سؤال',
      i_have_a_question: 'الدورة لا تظهر',
      i_need_help_regarding_my_payment: 'مشكلة في المدفوعات',
      i_have_a_suggestion: 'لدي اقتراح',
      start_conversation: 'ابدأ المحادثة',
      subject: 'الموضوع',
      enter_objective: 'نص الموضوع',
      message: 'الرسالة',
      message_here: 'هنا',
      save: 'اللغة',
      add_comment: 'أضف تعليق',
      comment: 'المراجعة',
      comment_here: 'التعليق هنا',
      submit: 'إرسال',
      // MYACCOUNT
      personal_details: 'اللغةاختار',
      Name: 'اللغة',
      your_phone_number: 'اللغةاختار اللغة',
      age: 'العمر',
      select_gender: 'نوع الجنس',
      select_profession: 'المهنة',
      profession: 'اختر',
      gender: 'اختيار',
      update: 'تحديث',
      marks: 'العلامات',
      // exchange_with_courses
      about_us: 'من نحن',
      points: ' نقطة',
      invitation: 'دعوة صديق',
      invitation_rewards: 'مكافآت الدعوة',
      common_question: 'الأسئلة الشائعة',
      terms_conditions: ' الشروط والخصوصية',
      privacy_policy: 'اللغةاختار ',
      help_center: 'اللغةاختار اللغة',
      invite_friends: 'دعوة صديق',
      points_program: 'برنامج النقاط',
      log_out: 'تسجيل الخروج',
      log_out_title: 'هل أنت متأكد أنك تريد تسجيل الخروج؟',
      referrals: 'الإحالات',

      open_time_for_education: 'الوقت مفتوح للتعليم',
      follow_up_with_the_trainee: 'المتابعة مع المتدرب',
      availability: 'التوفر 24/7',
      point_program: 'برنامج النقاط',
      accredited_certificates: 'شهادات معتمدة',
      professional_experts: 'الخبراء المحترفين',
      number_of_points: 'عدد النقاط :',
      point: ' 25/25 نقطة',

      dont_have_an_account: 'ليس لديك حساب',
      sign_up: 'اشتراك',
      sign_up_now: 'اشتراك الان',
      open_time_for_education_desc: 'يمكنك تعلم الدرس في أي وقت وفي أي مكان.',
      follow_up_with_the_trainee_desc:
        'في كل دورة تدريبية هناك متابعة للمتدرب حتى الانتهاء من مهمة الدورة.',
      availability_desc: 'الدرس متاح 24 ساعة + الدعم الفني.',
      point_program_desc:
        'ساعد زملائك في شرح أي جزء من المادة واكسب النقاط واستبدلها بالمال أو قم بشراء أي دورة تدريبية أخرى.',
      accredited_certificates_desc: 'كل دورة تدريبية مصحوبة بشهادة معتمدة',
      professional_experts_desc: 'نقدم لك أفضل مدربي التصدير في مجال الاستثمار',

      about_us_desc:
        'في هذه الدورة سوف ندرس المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق في هذه الدورة سوف ندرس المراحل الأولية لكي أصبح مصمم UI/UX. مصمم UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق في هذه الدورة سندرس المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أريد لعمل تصميم موقع ويب أو تصميم تطبيق سندرس في هذه الدورة المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق',

      privacy_policy_desc:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      terms_conditions_desc:
        'في هذه الدورة سوف ندرس المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق في هذه الدورة سوف ندرس المراحل الأولية لكي أصبح مصمم UI/UX. مصمم UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق في هذه الدورة سندرس المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أريد لعمل تصميم موقع ويب أو تصميم تطبيق سندرس في هذه الدورة المراحل الأولية لكي أصبح مصمم UI/UX، لدي عدة خطوات أقوم بها غالبًا عندما أرغب في تصميم موقع ويب أو تصميم تطبيق',

      // Points_Program
      points_program_desc:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      question_one: 'اللغةاختار اللغة?',
      ans_one:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      question_two: 'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة?',
      ans_two:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      points_balance: 'اللغةاختار اللغةاللغةاختار اللغةاللغة',
      points_balance_desc:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      question_three: 'اللغةاختار اللغةاللغةاختار اللغة?',
      ans_three:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      question_four:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة?',
      ans_four:
        'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',

      // COMMONQUESTION
      common_question_one: 'اللغةاختار اللغة?',
      common_ans_one: 'اللغةاختار اللغة',
      // INVITESCREEN
      invite_your_friends: 'ادعوا أصحابك',
      invite_desc:
        'قم باحالة أصدقائك و اكسب النقاط، تستطيع تحويل النقاط الى مال أو شراء دورات',
      invite_rewards: 'دعوة المكافآت',
      invite_rewards_desc:
        'قم بإحالة أصدقائك واكسب ما يصل إلى 25% بنجاح من خلال رسالة تهنئة نصية وهمية ذات فوائد كبيرة على نشاطك',
      invite_link: ' رابط الإحالة',
      my_invited_rewards: 'الإحالات',
      lecturer: 'محاضر',
      // INVITEPOINTSCREEN
      total_points: 'المبلغ المالي',
      total_points_invitation: 'مجمل النقاط',
      total_invited: 'اللغةاختار اللغة',
      total_invited_invitation: 'إجمالي المدعوين',
      currency: '250 ريال سعودي',
      new_courses: 'دورات جديدة',
      invited_users_rewards: 'مكافآت المستخدمين المدعوين',
      got_10_point_and_youve_got_50_SAR:
        'حصلت على 10 نقاط وحصلت على 50 ريالاً سعوديًا',
      continue_widthdraw: 'متابعة',

      // PRIVACYSCREEN
      two_step_verification: '2 اللغةاختار اللغة',
      step_1: 'اللغةاختار اللغةاللغةاختار اللغة?',
      phone_number: 'رقم الجوال',
      email_address: 'عنوان البريد الإلكتروني',
      step_2: 'اللغةاختار اللغة?',
      term_1: 'اللغةاختار اللغةاللغةاختار اللغة',
      term_2: 'اللغةاختار ',

      // TRANSACTIONHISTORY
      filter: 'تصفية',
      all: 'الجميع',
      received_rewards: 'المكافآت المستلمة',
      sended_rewards: 'إرسال المكافآت',
      apply: 'تأكيد',
      coupon: 'رمز الكوبون',
      received_points: 'النقاط المستلمة',
      date: 'التاريخ:',
      status: 'الوضعية:',
      amount: 'القيمة:',
      transaction_id: 'رقم المعاملة :',
      transaction_description: 'وصف المعاملة:',
      user_information: 'معلومات المستخدم :',
      billing_address: 'عنوان الفواتير :',
      get_invoice: 'طباعة الفاتورة',
      done: 'منتهي',
      // LOGOUT
      logout_desc: 'اللغةاختار اللغة',
      cancel: 'إلغاء',
      yes_logout: 'اللغةاختار اللغة',
      yes: 'نعم',
      no: 'لا',
      // SETTINGSCREEN
      dark_mode: 'الوضع الداكن',
      language: 'اللغة',
      mute_notification: 'الإشعارات',
      sound: 'الصوت',
      privacy: 'الخصوصية و الشروط',
      help: 'الدعم الفني',
      reward: 'المكافأة',
      points_remaining: 'نقطة متبقية',
      replace: 'استبدل',

      make_selection: 'قم بالاختيار',
      continue_via_mail: 'الاستمرار عبر الرسائل القصيرة',
      continue_via_mobile: 'الاستمرار عبر الهاتف المحمول',

      // point:"15/15 points",
      // NOTIFICATION
      notifications: 'الإشعارات',
      course_update: 'تحديث الدورة',
      assignment_reminders: 'تذكيرات المهام',
      event_notifications: 'إشعارات الفعاليات',
      account_Notifications: 'إشعارات الحساب',
      system_updates: 'تحديثات النظام',
      feedback_and_surveys: 'تقييم واستطلاعات الرأي',
      chat_engagement: 'مشاركة في الدردشة',
      progress_update: 'تحديث التقدم',
      account_security: 'أمان الحساب',
      billing: 'الفواتير',
      no_data_found: 'لم يتم العثور على بيانات',
      // Exchange screen
      withdrawal_has_been_done_successfully: 'لقد تمت عملية السحب بنجاح',
      withdrawal_request_has_been_done_successfully_to_admin:
        'لقد تم طلب السحب بنجاح إلى المشرف',
      exchange_screen: 'اللغةاختار اللغة',
      get_exchange: 'استبدل النقاط',
      select_exchange_way: 'حدد طريقة الاستبدال',
      exchange_with_money: 'الاستبدال النقدي',
      exchange_with_courses: 'شراء الدورات',
      claim_now: 'استبدل',
      Please_enter_your_otp_send_to_your:
        'الرجاء إدخال كلمة المرور الخاصة بك وإرسالها إلى',
      enter_your_otp: 'Enter your otp',
      reward_courses: 'الدورات',
      buy_course: 'اشتري الآن',
      point_amount: 'النقطة والمبلغ',
      total_spend: 'اللغةاختار اللغة',
      points_spending_details: 'تفاصيل إنفاق النقاط',
      courses_available: 'الدورات المتاحة',
      my_balance: 'الرصيد',
      buy_now: 'اشتري الآن',
      withdraw: 'سحب',
      transaction_details: 'التفاصيل',
      money_withdraw: 'سحب الأموال',
      please_verify: 'التحقق',
      enter_amount: 'أدخل المبلغ',
      withdrawal_amount: 'قيمة السحب:',
      Fees: 'الرسوم:',
      money_exchange: 'حوالة نقدية',
      you_will_receive: 'المبلغ:',
      withdraw_desc: 'اللغةاختار اللغةاللغةاختار اللغةاللغةاختار اللغة',
      confirm_withdrawal: 'اللغةاختار اللغة',
      are_your_sure: 'هل انت متأكد؟',
      cancel_quiz_will_be_enable_to_proceed_again:
        'سيتم تمكين إلغاء الاختبار للمتابعة مرة أخرى',
      withdrawal_proceed: 'سيتم المضي قدما في الانسحاب',
      guider: 'مرشد',
      widthdraw_desc:
        'بعد مواصلة الدفع، سيرى المسؤول تفاصيل حسابك ثم يرسل المشرف المبلغ إلى حسابك',
      cancel_quiz: 'إلغاء الاختبار',
      go_to_wallet: 'اذهب إلى محفظتي',
      invitation_reward_desc: 'حصلت على مبلغ 50 ريال',
      num_of_user: '20 مستخدم',
      change_language: 'عربي',
      activity_course_text: 'اللغةاللغةاختاراللغةاللغةاختار اللغة',
      send: 'إرسال',
      enter_email_address: 'أدخل عنوان البريد الالكتروني',
      enter_age: 'أدخل العمر',
      level: 'المستوى',
      SAR_now_in_your_mobile_wallet: '250 ريال الآن في محفظتك',
      congratulations_widthdraw_via_mobile: 'مبروك\n250 ريال',
      course_Desc: 'أساسيات مصمم UI/UX',
      design_thingking: 'التفكير في التصميم',
      course_review: 'مراجعة الدورة',
      show_more: 'أظهر المزيد',
      UX_reaserch: 'أبحاث تجربة المستخدم',
      UI_design: 'تصميم واجهة المستخدم',
      landing_page: 'الصفحة المقصودة',
      app_design: 'تصميم التطبيق',
      best_points_program_members: 'متصدري برنامج النقاط',
      reply: 'رد',
      task: 'المهام',
      type: 'النوع',
      enter_your_amount: 'أدخل المبلغ الخاص بك',
      // your_submission: 'التقديم الخاص بك',
      go_back: 'عُد',
      pay_again: 'ادفع مرة أخرى',
      time_spending_details: 'تفاصيل',
      enetr_your_email: 'أدخل بريدك الإلكتروني',
      assignment_progress: 'تقدم المهمة',
      quiz_progress: 'تقدم الاختبار',
      overall_progress: 'التقدم العام',
      total_time: 'الوقت الكلي',
      remaining: 'المتبقي',
      total_rewards: 'إجمالي النقاط',
      ask_question: 'عدد الأسئلة',
      complete_quiz: 'اتمام',
      done_assignments: 'اتمام',
      view_videos: 'مشاهدة الدروس',
      videos: 'الدروس',
      assignments: 'المهام',
      quiz: 'الاختبارت',
      bonus_points: 'برنامج النقاط',
      your_quiz_has_been_submitted_successfully:
        'لقد تم إتمام الاختبار الخاص بك بنجاح',
      male: 'ذكر',
      female: 'أنثى',
      other: 'آخر',
      professor: 'أستاذ',
      teacher: 'مدرس',
      meeting_link: 'رابط الاجتماع',
      format: 'شكل',
      title: 'عنوان',
      lecturar: 'محاضر',
      ramaning_days: 'الأيام المتبقية',
      duration: 'مدة',
      all_notifications: 'كل الاشعارات',
      min_ago: 'دقائق مضت',
      Minutes: 'دقائق',
      hours_ago: 'منذ ساعات',
      personal_information: 'المعلومات الشخصية',
      // QUESTION

      question1: 'أي نوع من الدورات تقدمها أكاديمية نمو؟',
      answer1:
        'دورات في الأسواق السعودية والأمريكية والعالمية للأسهم وصناديق الاستثمار والمؤشرات وصناديق الاستثمار العقاري - التمويل التشاركي بالدين والمساهمة بالأسهم والصكوك والخيارات والعملات الرقمية',

      question2: 'ما هي مزايا الدورات التي تقدمها أكاديمية نمو؟',
      answer2:
        'من خلال المشاركة في أي دورة في أكاديمية نمو، تحصل على الفوائد التالية: الوصول إلى محتوى الدورة من أي مكان: عند الاشتراك في أي دورة، تدفع تكلفة الاشتراك مرة واحدة فقط. يمكنك عرض محتوى الدورة من أي مكان وفي أي وقت. تحديثات مستمرة مجانية: تُحدث دورات أكاديمية نمو باستمرار لمواكبة التطورات. عند الانضمام إلى أي دورة، ستحصل على جميع التحديثات المستقبلية مجانًا دون دفع تكلفة إضافية حتى تنتهي الدورة التي انضممت إليها. توظيف متخصص مع المتدرب خلال الدورة: توظف أكاديمية نمو مدربين وأشخاص متخصصين للرد على الاستفسارات التي يطرحها الطالب. يكون متخصص معه لمتابعته خطوة بخطوة حتى تتم متطلبات الدورة. نصائح شخصية: بعد اجتياز الدورة والامتحان (إذا كان قابلاً لذلك)، سيقوم مدربونا بمراجعة عملك، وتقديم نصائح شخصية لك، وتحديد المجالات التي يجب عليك التركيز عليها. توفير الإرشاد: بعد الانتهاء من الدورة، ستكون هناك أدوات متاحة لك كمتدرب تتعلق بالدورة التي اتخذتها.',

      question3: 'هل توفر أكاديمية نمو شهادة معتمدة عند اكتمال الدورة؟',
      answer3: 'نعم، متوفرة، ولكن فقط إذا نجحت في الامتحان بنجاح.',

      question4: 'ماذا تعني الشهادة المعتمدة من أكاديمية نمو؟',
      answer4:
        'تُصدر جميع الشهادات التي تصدرها أكاديمية نمو بعد اجتياز الامتحان بنجاح فقط. هذه ليست "شهادات إكمال" أو "شهادات حضور"، ولا يمكن الحصول عليها عن طريق الانضمام إلى الدورة وحده. بل يجب على الطالب اجتياز الامتحان. تُقدم أي شهادة تصدرها أكاديمية نمو في شكل إلكتروني مع رابط مباشر على موقع الأكاديمية، مما يتيح التحقق من صحتها في أي وقت. جميع الشهادات الورقية التي تصدرها أكاديمية نمو مختومة وتحتوي على رمز فريد يسمح بالتحقق من صحتها من موقع الأكاديمية.',

      question5: 'هل تضمن الحصول على الشهادة عند شرائي للدورة؟',
      answer5: 'لا، يجب عليك اجتياز الامتحان بنجاح للحصول على الشهادة.',

      question6: 'ما هو الدعم الفني؟',
      answer6:
        'إذا كانت الدورة تتضمن دعمًا فنيًا، فهذا يعني وجود موظف مخصص سيكون بجانبك لمساعدتك في إكمال جميع مهام الدورة حتى تجتازها. إذا لم تحتوي الدورة على شرط (دعم فني)، فهذا يعني أنك ستكون راضيًا عن محتوى الدورة.',

      question7: 'هل لدي الحق في نشر محتويات الدورة؟',
      answer7:
        'من خلال المشاركة في أي دورة، تلتزم بعدم مشاركة أي معلومات أو روابط أو محتوى كان داخل الدورة في أي مكان وتلتزم بالاحتفاظ بها لنفسك فقط، وأكاديمية نمو لديها الحق في المساءلة القانونية.',

      question8: 'كيف يمكنني الدراسة؟',
      answer8:
        'بعد شراء الدورة، ستتلقى جميع معلومات تسجيل الدخول إلى نظام الدراسة على بريدك الإلكتروني ورقم هاتفك، وستجد الملفات هناك، وسيتصل بك الموظف المكلف بخدمتك إذا كانت الدورة تتضمن دعمًا فنيًا.',

      question9: 'ما نوع الدورات التي تقدمها أكاديمية نمو؟',
      answer9:
        'تقديم دورات تعليمية في مجال الاستثمار السلبي، مثل: الأسهم - التمويل التشاركي بالدين والمساهمة بالأسهم - صناديق الاستثمار - صناديق الاستثمار العقاري - صناديق المؤشرات.',

      question10: 'هل هناك شهادة معتمدة عند اكتمال الدورة؟',
      answer10: 'نعم، متوفرة، ولكن فقط إذا نجحت في الامتحان بنجاح.',

      question11: 'لماذا يجب علي التسجيل في دورات الأكاديمية؟',
      answer11:
        'تم إعداد الدورات من قبل خبراء ومتخصصين، مما يساعدك على أن تكون مستثمرًا ناجحًا، وهناك فريق متخصص يتابع مع المتدرب من اللحظة الأولى بعد المشاركة في الدورة حتى يستوفي متطلبات الدورة ويصبح محترفًا فيها.',

      question12: 'هل يجب عليّ الالتزام بحضور الدورة في إطار زمني محدد؟',
      answer12:
        'الدورة متاحة بالكامل على أكاديمية نمو دون أن تكون مرتبطًا بحدود زمنية، ويمكنك حضورها في أي وقت تريده. جميع الدروس مسجلة، ويمكنك تكرار الدرس أكثر من مرة والعودة إليه في أي وقت تحتاج إليه. مدربونا متواجدون دائمًا وسيتابعون معك ويجيبون على أسئلتك بوتيرتك الخاصة.',

      question13: 'كم من الوقت لدي للوصول إلى محتويات الدورة؟',
      answer13:
        'لكل دورة تدريبية وقت محدد يتيح للمشترك الوصول إليها لمدة لا تقل عن 3 أشهر إلى فترة غير محددة، خلالها يمكنك الوصول إلى محتوى الدورة والاستفادة من الدعم الفني. تتوسع دورات أكاديمية نمو، ويتم إضافتها باستمرار وتحديثها. إنها ليست دورات صغيرة موجزة. من خلال الانضمام إلى أي دورة، ستحصل على وصول كامل إليها حسب الفترة الزمنية وإلى جميع التحديثات والإضافات المستقبلية لها.',

      question14:
        'لدي سؤال عن إحدى الدروس وواجهت مشكلة لا أعرف كيفية حلها. ماذا يجب أن أفعل؟',
      answer14:
        'نحن نوفر فريقًا متخصصًا بخبرة فنية ممتازة للإجابة على استفسارات الطلاب وحل مشاكلهم. يمكنك إبلاغهم بمشكلتك وسيتصل الفريق بك لمساعدتك في حلها.',

      // Supporting KeyWords
      please_resend_your_otp_and_verify_its_you:
        'يرجى إعادة إرسال كلمة المرور الخاصة بك والتحقق من هويتك',
      user_not_verified: 'لم يتم التحقق من المستخدم',
      number_of_attempted_quiz: 'عدد محاولات الاختبار',
      Account_already_exist_sign_in_please:
        'الحساب موجود بالفعل قم بتسجيل الدخول من فضلك',
      account_already_existed: 'الحساب موجود بالفعل',
      please_login: 'الرجاء تسجيل الدخول',
      course_access_denied: 'تم رفض الوصول إلى الدورة التدريبية',
      You_cannot_access_this_course_because_thet_ime_duration_has_been_completed:
        'لا يمكنك الوصول إلى هذه الدورة التدريبية بسبب اكتمال المدة الزمنية',
      your_password_is_changed_by_Admin:
        'تم تغيير كلمة المرور الخاصة بك من قبل المشرف',
      cant_access_this_course: 'لا يمكن الوصول إلى هذه الدورة التدريبية',
      you_arent_enrolled_in_this_course: 'أنت غير مسجل في هذه الدورة',
      something_went_wrong_server_error: 'حدث خطأ ما، خطأ في الخادم',
      something_went_wrong: 'هناك خطأ ما',
      out_of: 'من',
      mcqs: 'إجابات Mcq صحيحة',
      please_enter_your_phoneNo_with_country_code:
        'الرجاء إدخال رقم هاتفك مع رمز البلد',
      already_have_an_account: 'هل لديك حساب؟',
      teacher_not_assign_your_marks: 'الاختبار قيد المراجعة',
      totalSpend: 'إجمالي الإنفاق',
      files: 'ملفات',
      answers_correct: 'إجابات الاختيارات المتعددة صحيحة',
    },
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: I18nManager.isRTL ? 'ar' : 'en',
  // lng: I18nManager.isRTL ? 'en' : 'ar',
  interpolation: {
    escapeValue: true,
  },
});

const changeLan = async () => {
  const language = await AsyncStorage.getItem('lan');
  if (language != null) {
    i18n.changeLanguage('ar').then(() => {
      console.log('confiiiil;aggg', i18n);
    });
  }
};

changeLan();
