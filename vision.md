---
layout: page
title: Vision
permalink: /vision/
---

# 1. Digital Gold

Bitcoin has proved to be a bearer digital asset that can be transferred but
not duplicated (i.e. it can be spent once, but not _double-spent_). Scarce in
digital realm as nothing else before, bitcoin is digital gold with a secure
embedded settlement network. More a crypto-commodity then a crypto-currency,
bitcoin aims to be a world reserve asset.

If one thinks about the role of physical gold in the history of civilization,
money, and finance, then it becomes clear that the digital equivalent of gold
could be disruptive in the current digital civilization and the future of
money and finance. Bitcoin is the groundbreaking achievement by
Satoshi Nakamoto, not the so-called _blockchain technology_.

<iframe width="560" height="315"
        src="https://www.youtube.com/embed/VbwUwioZ9F0"
        frameborder="0" allow="autoplay; encrypted-media"
        allowfullscreen>
</iframe>

# 2. The Misunderstanding About Blockchain

Blockchain is just an append-only sequential data structure:
new blocks (of bitcoin transactions) can be appended at the end of the chain,
to change a block in the middle of the chain all subsequent blocks need
to be changed. As such, it is very inefficient compared to a
relational database.

Blockchain requires an intrinsic native digital asset to solve the
double-spending problem, i.e. to provide the economic incentives
for the so-called _miners_ (the blockchain back-office) to be honest.
Miners compete to validate a new block of transactions:
the winner providing _proof-of-work_ of a new block finalization is
rewarded with the issuance of new bitcoins in a special _coinbase_
transaction, included in that same block. This economic incentive induces
miners to reject double-spending attempts and only finalize valid transactions;
otherwise the block would be deemed invalid by the network and rejected,
removing it (and the included coinbase reward) from the transaction history:
ultimately, the winning miner would have just wasted his work.

Without an intrinsic native digital asset providing
seigniorage revenues, a blockchain would need to select and appoint its back-office
operators, ultimately resorting to central governance.
If this is the case, then why use a blockchain,
i.e. a subpar data structure, instead of an efficient relational database?

<iframe width="560" height="315"
          src="https://www.youtube.com/embed/dt-RPBPXTQs"
          frameborder="0" allow="autoplay; encrypted-media"
          allowfullscreen>
</iframe>

# 3. Blockchain Beyond Bitcoin: Notarization

There is no blockchain without bitcoin; however, as Andreas Antonopoulos said,
_there is blockchain beyond bitcoin_: [time-stamping]({{ site.baseurl }}/ots/) and notarization.

A generic data file can be _hashed_ to produce a short unique identifier,
equivalent to its digital fingerprint. Such a fingerprint can be associated
to a bitcoin transaction and hence registered on the
blockchain in a block generated at a given time.
Therefore, the immutability of the bitcoin transaction registered
on the blockchain implicitly provides time-stamping, proving the data
file existence at that moment in time in that specific status.

Here, the blockchain is used as notary service, ensuring that documents
cannot be backdated. Notarization is blockchain-agnostic, anyway it is as reliable
as the blockchain it uses, with the bitcoin one being the most tamper-resistant.
Moreover, please note that notarization cannot guarantee validity,
correctness, or accuracy of the content being time-stamped.

A single blockchain transaction can timestamp an unlimited number of documents, aggregating
them in a Merkle tree, whose root is then actually time-stamped.
The process has been standardized as [OpenTimestamps](https://www.opentimestamps.org/), an open vendor and blockchain independent format that allows for third party auditability and it is suitable for regulatory prescriptions.

What jewelry is for gold, notarization is for bitcoin:
not essential, but effective at leveraging its beauty.

# 4. Financial Services for Crypto-assets

Even if one is only interested in genuine technologic applications of blockchain,
the most promising field is the development of
tools and practices for financial services involving crypto-assets,
primarily custody for institutional investors and high net worth individuals.

_Digital gold is what matters._
