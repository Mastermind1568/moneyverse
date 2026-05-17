export interface Module {
  id: string;
  title: string;
  duration: string;
  difficulty: "Beginner" | "Beginner-Intermediate" | "Intermediate";
  objectives: string[];
  description: string;
}

export interface Phase {
  number: number;
  title: string;
  subtitle: string;
  modules: Module[];
}

export const CURRICULUM_PHASES: Phase[] = [
  {
    number: 1,
    title: "The Foundation",
    subtitle: "Build the mental model before touching a single satoshi.",
    modules: [
      {
        id: "1.1",
        title: "What is Money?",
        duration: "1 hr",
        difficulty: "Beginner",
        objectives: [
          "Trace the evolution from barter to commodity to fiat money",
          "Identify the six properties of sound money and why fiat fails them",
          "Understand why monetary history is the context for Bitcoin",
        ],
        description: "Before you can understand Bitcoin, you must understand what money is and what it has been throughout human history. This module travels from the problems of barter, through commodity money (shells, salt, gold), to the modern fiat system — building the foundational mental model that makes Bitcoin's value proposition self-evident.",
      },
      {
        id: "1.2",
        title: "The Fiat Leak",
        duration: "1.5 hrs",
        difficulty: "Beginner",
        objectives: [
          "Understand the M2 money supply and why it grows",
          "Quantify the gap between official CPI and real purchasing power erosion",
          "Calculate the impact of monetary debasement on your specific savings",
        ],
        description: "Inflation is not a natural phenomenon — it is a policy choice. This module unpacks the mechanics of money creation, the Federal Reserve's role, and the mathematical certainty of purchasing power erosion under the fiat system. By the end, you will have calculated exactly how much wealth you have lost to inflation over your savings lifetime.",
      },
      {
        id: "1.3",
        title: "Introduction to Bitcoin",
        duration: "1.5 hrs",
        difficulty: "Beginner",
        objectives: [
          "Understand Bitcoin's origin and what problem it was designed to solve",
          "Grasp the 21 million hard cap and why it matters",
          "Distinguish Bitcoin from all other cryptocurrencies conceptually",
        ],
        description: "Who is Satoshi Nakamoto, and what exactly did they invent? This module covers Bitcoin's genesis — the 2008 white paper, the first transaction, and the elegant simplicity of the solution to the double-spend problem. We establish early why Bitcoin is in a fundamentally different category from every subsequent cryptocurrency.",
      },
      {
        id: "1.4",
        title: "How Bitcoin Works — Simplified",
        duration: "2 hrs",
        difficulty: "Beginner",
        objectives: [
          "Understand the blockchain as a distributed ledger",
          "Grasp Proof of Work at a conceptual level without cryptographic detail",
          "Understand what public and private keys are and why they matter",
        ],
        description: "Bitcoin's technology is often presented as either incomprehensibly complex or trivially simple. This module takes the middle path: enough technical understanding to grasp why Bitcoin is secure and trustless, without requiring a computer science degree. By the end, you'll understand what miners do, why transactions are irreversible, and what 'your keys' actually means.",
      },
    ],
  },
  {
    number: 2,
    title: "The Protocol",
    subtitle: "Acquire Bitcoin correctly and secure it properly.",
    modules: [
      {
        id: "2.1",
        title: "Absolute Scarcity & The Halving",
        duration: "2 hrs",
        difficulty: "Beginner-Intermediate",
        objectives: [
          "Understand Bitcoin's emission schedule and why it matters for price",
          "Trace the historical impact of each halving on market cycles",
          "Grasp the Stock-to-Flow concept and Bitcoin's growing scarcity ratio",
        ],
        description: "The halving is Bitcoin's heartbeat — a programmatic supply shock that occurs every four years with mathematical precision. This module deep-dives into how the halving works, what it has done to price historically, and why it creates the four-year market cycle that sophisticated investors use to guide their strategy. The halving is not speculation — it is scheduled.",
      },
      {
        id: "2.2",
        title: "Wallets & Keys: Your Digital Vault",
        duration: "1.5 hrs",
        difficulty: "Beginner-Intermediate",
        objectives: [
          "Distinguish between hot wallets, hardware wallets, and cold storage",
          "Understand seed phrases and why they must be protected above all else",
          "Choose the right custody level for your specific holdings",
        ],
        description: "'Not your keys, not your coins' is the most important phrase in Bitcoin. This module explains the spectrum of Bitcoin custody options — from exchange accounts to hardware wallets to airgapped cold storage — and provides a clear framework for choosing the right security level based on the amount you hold and your personal threat model.",
      },
      {
        id: "2.3",
        title: "Buying Your First Bitcoin",
        duration: "1.5 hrs",
        difficulty: "Beginner-Intermediate",
        objectives: [
          "Select a reputable exchange with appropriate fee structures",
          "Navigate KYC requirements and understand their implications",
          "Execute your first Bitcoin purchase and track the transaction on-chain",
        ],
        description: "Theory without action is just entertainment. This module is a practical walkthrough of acquiring Bitcoin — exchange selection (with detailed criteria for what to look for), account setup, KYC process, executing a buy order, and verifying the transaction on the blockchain. You will have purchased Bitcoin by the time this module is complete.",
      },
      {
        id: "2.4",
        title: "Mastering Self-Custody",
        duration: "2.5 hrs",
        difficulty: "Beginner-Intermediate",
        objectives: [
          "Set up a hardware wallet from scratch following a secure procedure",
          "Back up and verify a seed phrase correctly",
          "Transfer Bitcoin from an exchange to self-custody",
        ],
        description: "Self-custody is the most important skill a Bitcoin holder can develop. This is a hands-on, step-by-step walkthrough of setting up a hardware wallet, generating and backing up your seed phrase, verifying your backup, and moving Bitcoin off an exchange into your own custody. By module end, you are operating as a sovereign Bitcoin holder.",
      },
    ],
  },
  {
    number: 3,
    title: "The Strategy",
    subtitle: "Accumulate intelligently. Exit on your terms.",
    modules: [
      {
        id: "3.1",
        title: "Dynamic Dollar Cost Averaging",
        duration: "2 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Design a personal DCA plan with a sustainable monthly baseline",
          "Implement cycle-aware multipliers using objective indicators",
          "Set up automated Bitcoin purchases on a reputable platform",
        ],
        description: "Dollar-cost averaging is the floor; Dynamic DCA is the upgrade. This module teaches you to build a rules-based accumulation system that increases your Bitcoin purchases during bear markets (when Bitcoin is cheap) and reduces them near cycle peaks (when risk is elevated). The result: a better cost basis and a more disciplined accumulation strategy.",
      },
      {
        id: "3.2",
        title: "The 4-Year Cycle Strategy",
        duration: "2.5 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Identify the four phases of the Bitcoin market cycle with precision",
          "Use on-chain indicators (MVRV, NUPL, Puell Multiple) to confirm cycle position",
          "Build a cycle calendar for the current epoch",
        ],
        description: "The four-year cycle is the most reliable pattern in Bitcoin markets. This module provides a deep-dive into cycle mechanics — how to identify each phase, which on-chain and market indicators confirm cycle position, and how to calibrate your accumulation and exit strategy around the halving schedule. This is the strategic framework professional Bitcoin investors use.",
      },
      {
        id: "3.3",
        title: "Exit Architecture: Preserving Gains",
        duration: "2 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Build a personalized ladder selling plan with specific price targets",
          "Understand on-chain euphoria signals and how to use them as exit triggers",
          "Create a tax-aware exit strategy that minimizes capital gains liability",
        ],
        description: "Accumulation is only half the strategy. Extracting value in bull markets — without selling too early or holding too long — is what separates successful Bitcoin investors from those who perpetually ride cycles without realizing gains. This module builds your complete exit architecture: price ladder, indicator triggers, tax planning, and psychological pre-commitment systems.",
      },
      {
        id: "3.4",
        title: "Advanced Security & Inheritance",
        duration: "2.5 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Set up a multisignature Bitcoin wallet for maximum security",
          "Design an inheritance plan that ensures heirs can access your Bitcoin",
          "Conduct a thorough threat model of your personal custody setup",
        ],
        description: "As your Bitcoin holdings grow, so does the importance of your security architecture. This module covers multisignature wallets (the gold standard for significant holdings), comprehensive inheritance planning so your Bitcoin passes to your heirs, advanced physical security considerations, and a complete personal threat model to identify and address your specific vulnerabilities.",
      },
    ],
  },
  {
    number: 4,
    title: "The Global Context",
    subtitle: "Bitcoin's role in the future of money.",
    modules: [
      {
        id: "4.1",
        title: "Bitcoin as a Macro Asset",
        duration: "2 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Analyze Bitcoin's correlation with risk assets, gold, and the dollar",
          "Understand global liquidity cycles and Bitcoin's relationship to them",
          "Evaluate Bitcoin's place in a traditional portfolio context",
        ],
        description: "Bitcoin does not exist in isolation — it operates within global macroeconomic dynamics. This module explores how Bitcoin correlates (and doesn't correlate) with the S&P 500, gold, and other macro assets, how global liquidity cycles drive Bitcoin's price, and how professional portfolio managers are beginning to incorporate Bitcoin into allocations. The macro lens provides context beyond the halving cycle.",
      },
      {
        id: "4.2",
        title: "Monetary Sovereignty & Emerging Markets",
        duration: "2.5 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Understand the CFA franc system and its impact on 14 African nations",
          "Analyze El Salvador's Bitcoin experiment and its real-world outcomes",
          "Identify the populations for whom Bitcoin provides the greatest immediate value",
        ],
        description: "Bitcoin's most powerful use cases are not in wealthy countries with stable currencies. They are in places where fiat money destroys purchasing power overnight, where banking is inaccessible to most citizens, and where capital controls trap people in monetary systems that serve governments rather than individuals. This module explores Bitcoin as a tool of monetary sovereignty in the developing world.",
      },
      {
        id: "4.3",
        title: "The Future of the Bitcoin Standard",
        duration: "1.5 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Understand the concept of hyperbitcoinization and the conditions that accelerate it",
          "Analyze the emerging Bitcoin circular economy",
          "Develop a personal framework for Bitcoin's role in your long-term financial life",
        ],
        description: "Where does Bitcoin go from here? This capstone module explores the long-term scenarios for Bitcoin adoption — from asset class to reserve currency to the foundation of a new global monetary system. We examine the Bitcoin circular economy, the conditions that could accelerate adoption, and how to position your personal finances for multiple possible futures. You leave with conviction grounded in understanding.",
      },
      {
        id: "4.4",
        title: "Your 4-Year Operator Plan",
        duration: "2 hrs",
        difficulty: "Intermediate",
        objectives: [
          "Synthesize all four phases into a single, executable personal protocol",
          "Build your cycle calendar from current block height to the 2028 halving and beyond",
          "Define your personal victory conditions and what financial sovereignty looks like for you",
        ],
        description: "This is the integration module — where everything comes together into a single, actionable document you own. You will leave with a written 4-year operator plan: your accumulation targets, your DCA parameters, your custody setup, your exit ladder, your cycle calendar, and your inheritance framework. Not a vague aspiration. A specific system with numbers, dates, and decisions already made. This is the document you will return to every quarter.",
      },
    ],
  },
];
