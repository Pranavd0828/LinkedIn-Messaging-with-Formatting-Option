# What, why and why now

**What we are doing**

- We are introducing a comprehensive Rich Text Formatting toolbar that lives directly above the message composition area in the main chat window. This feature allows users to apply Bold, Italic, Strikethrough, Bulleted Lists, and Numbered Lists styles to their messages before sending them. It is a visual enhancement to the existing messaging product that leverages standard web technologies to give users more control over how their words are presented.

**How we are executing this**

- We are implementing a lightweight rich text editor using native web technologies to ensure fast performance and broad compatibility. The solution integrates a custom-designed toolbar directly into the chat interface, featuring intuitive SVG icons for each formatting option. By mapping these controls to semantic HTML elements, we ensure that all formatted messages remain accessible and readable across different devices and screen readers. We are keeping the dependency footprint minimal by avoiding heavy third-party text editors, which allows us to maintain the snappy, responsive feel that our users love.

**Why we are doing this**

- Current plain text messaging forces professionals to rely on capital letters or asterisks to create emphasis, which often comes across as unprofessional or aggressive. By adding rich text, we empower specific personas to communicate more effectively. For example, a Technical Recruiter can now use Bold formatting to clearly distinguish interview dates and times, significantly reducing the chance of candidate no-shows. Similarly, a Sales Development Representative can use Strikethrough to visually demonstrate price drops or limited-time offers, making their value proposition stand out in a crowded inbox. These small formatting tools solve the major pain point of ambiguity in high-stakes asynchronous communication.

**Why now should we be doing this**

- The shift to remote-first and hybrid work models has made written communication the primary way we collaborate and do business. Competitors in the professional messaging space, such as Slack and Microsoft Teams, have long established rich text as a standard table stakes feature. Users now expect the same level of expressiveness on professional networking platforms as they have in their workplace collaboration tools. Delaying this feature further risks making our direct messaging product feel outdated and less capable of handling complex professional workflows.
