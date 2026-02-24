<script lang="ts">
  interface QA {
    question: string;
    answer: string;
  }

  interface Section {
    title: string;
    items: QA[];
  }

  const faqs: Section[] = [
    {
      title: "Installation",
      items: [
        {
          question: "The installer is freezing!",
          answer:
            "Your Windows defender is likely removing the game. You will have to disable it or allow the game to be in your PC.",
        },
        {
          question:
            'It\'s stuck in "Waddle Forever is starting..." / The game has a "no such file or directory" error',
          answer: "Run the app as an administrator.",
        },
      ],
    },
    {
      title: "Usage",
      items: [
        {
          question: "Why are servers populated/full?",
          answer: "This is just decoration, the game is offline.",
        },
        {
          question: "How do I change to a different party?",
          answer:
            "Select the 'Timeline' option at the top, and then find the month/year that you want on the calendar. Click the specific day on the calendar that you want to jump to (you can only select days on which there was a new update).",
        },
        {
          question: "All the clothing items are X! What do I do?",
          answer:
            "You must make sure you installed the clothing package. Open Options > Settings and install the clothing.",
        },
        {
          question: "Where is my save data/settings?",
          answer:
            'All your penguins are stored in your save data. The easiest way to find this folder is opening the mods folder (open Options > Open mods > click on "Open Mods Folder"), and then next to the mods folder, you can find the data folder.',
        },
        {
          question: "How do I play with friends?",
          answer: `
            <p>You will need to setup a LAN environment. There are two main programs you can use: RAdmin VPN (Windows only) and ZeroTier. Once you have setup the LAN environment (the process depends on the program), the host must go on the menu and click on "Change your server's IP" and copy and paste their own IP (The IP inside the VPN, not their real IP!). Note that this is done WITHOUT the port (:24105), only the IP. Then for the others to join they must go on "Change the client IP" and paste the same IP used by the host.</p>
            <p><b>WARNING:</b> Make sure only to invite friends. The server is full of vulnerabilities for hackers!</p>
            `,
        },
      ],
    },
    {
      title: "Development",
      items: [
        {
          question: "Is <feature> planned?",
          answer: "If it was in the original browser version of Club Penguin, then almost certainly yes. Supporting the app version of Club Penguin would be an entirely different project. Adding features from CPPSs is not planned, but anyone is welcome to fork the project."
        },
        {
          question: "Will a mobile client be supported?",
          answer: "Flash Player was never well-supported on mobile, so it's unlikely at this time."
        }
      ]
    }
  ];
</script>

<div class="max-w-4xl mx-auto p-6">
  <h1>Frequently Asked Questions</h1>
  <ul class="space-y-4">
    {#each faqs as section}
      <h2><u>{section.title}</u></h2>
      {#each section.items as qa}
        <li class="border-b-2 pb-4">
          <h3>{qa.question}</h3>
          <p class="text-lg mt-2">{@html qa.answer}</p>
        </li>
      {/each}
      <br/>
    {/each}
  </ul>
</div>
