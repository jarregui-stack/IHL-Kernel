# The IHL Kernel

**An Open-Source Operating System for International Humanitarian Law**

Version 1.0 · April 2026 · Free Open-Source Legal Artifact (FOSLA)

---

## What Is This?

The IHL Kernel puts the primary sources of International Humanitarian Law in one place: treaties, customary rules, tribunal decisions, and authoritative commentary. It does not create new law. It maps what already exists.

The name comes from computer science. A kernel sits between hardware and software, managing how they talk to each other. This project sits between the fragmented sources of IHL and the people who need to use them.

## Why?

IHL has no code. The rules live across dozens of treaties, protocols, tribunal judgments, ICRC commentaries, and scholarly works. The International Law Commission said as much in 2006: fragmentation is built into a legal order with no central legislature. The Kernel gives you one reference point to navigate that.

It was built with three situations in mind. A humanitarian worker in a remote posting who needs to check an IHL rule and has no internet. A law student trying to understand how the Geneva Conventions, the ICRC's customary study, and the ICC's case law fit together without reading five hundred pages first. And the possibility of running a local AI model on a phone, backed by the Kernel as a compressed knowledge base, so the model can answer IHL questions without ingesting entire treaty databases each time.

## Repository Structure

```
IHL-Kernel/
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── docs/
│   ├── IHL_Kernel_Whitepaper.docx
│   └── Common_Article_3_Annotated.docx
├── web/
│   └── common-article-3.html              # opens directly in a browser
└── articles/
    └── (future annotated articles)
```

## The Common Article 3 Example

The repository includes an annotated version of Common Article 3 to the Geneva Conventions. Bold text is the original treaty. Colour-coded text shows where each interpretation comes from: ICTY in blue, ICTR in red, ICC in green, ICRC Commentary in teal, Customary IHL Rules in amber, Doctrine in brown, Other Tribunals in pink. Every interpretive statement has a footnote with the full citation.

The annex is available as a Word document and as a standalone HTML page.

## FOSLA

This project adapts Richard Stallman's four freedoms to legal artifacts:

- **Run.** Use the Kernel for any ethical purpose.
- **Study and Modify.** Adapt it to your jurisdiction or research.
- **Distribute.** Share exact copies.
- **Distribute Modified Versions.** Share your adapted version so others benefit.

## Modding

International law is modular. Which rules apply depends on which treaties a state has ratified, which customary norms it has persistently objected to, and which courts it recognises. Future versions of the Kernel will support toggling these parameters to produce jurisdiction-specific views.

## Caveats

This is a navigational tool, not a source of law. Do not cite it as authority in legal proceedings. Verify every reference against the primary sources. It does not replace qualified legal counsel.

## How to Contribute

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Citation

> Arregui Acosta, Juan Diego, *The IHL Kernel: An Open-Source Operating System for International Humanitarian Law*, Whitepaper v1.0, April 2026.

## Acknowledgements

This work builds on Prof. Álvaro Paúl's methodology in *The American Convention on Human Rights: Updated by the Inter-American Court* (2017), and on Pier Paolo Pigozzi's idea of making that approach interactive. The project's architecture owes a debt to Linus Torvalds and the open-source software movement.

## License

[CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Share and adapt freely, with attribution and under the same license.
