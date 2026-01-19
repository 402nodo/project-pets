import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <div className="page how-it-works-page">
      <div className="document-container">
        {/* Abstract Section */}
        <section className="document-section abstract-section">
          <div className="section-header">
            <div className="section-icon">▲</div>
            <h1 className="document-title">ABSTRACT</h1>
          </div>
          <div className="content-box">
            <div className="document-content">
              <p>
                "Project Pets" is a Real-World Asset (RWA) tokenization platform that transforms beloved pets into unique digital tokens on the Solana blockchain. This platform combines pixel art generation, AI-powered personality systems, and blockchain technology to create a new form of digital collectible. Users can design custom pixel art avatars, assign AI-driven personalities with unique traits and behaviors, and launch their pets as tradeable tokens on Pump.fun—a decentralized token launchpad. The central innovation lies in bridging the emotional connection to real pets with the emerging world of tokenized assets, creating a novel intersection between pet ownership, digital art, and decentralized finance.
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="document-section toc-section">
          <div className="section-header">
            <div className="section-icon">▲</div>
            <h1 className="document-title">TABLE OF CONTENTS</h1>
          </div>
          <div className="content-box">
            <div className="document-content">
              <ul className="toc-list">
                <li>Introduction & Core Concept</li>
                <li>System Architecture</li>
                <li>Pixel Art Generation System</li>
                <li>AI Personality Engine</li>
                <li>Token Creation Process</li>
                <li>Blockchain Integration</li>
                <li>User Experience Flow</li>
                <li>Technical Implementation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">▲</div>
            <h2 className="section-title">1. INTRODUCTION & CORE CONCEPT</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">1.1 Background</h3>
              <p>
                Project Pets enables users to create, personalize, and tokenize digital representations of their pets. The platform operates on three fundamental layers, bridging the gap between emotional pet ownership and the emerging world of tokenized assets.
              </p>
              
              <div className="info-box blue">
                <div className="box-title">CORE PLATFORM LAYERS</div>
                <ul>
                  <li><strong>Visual Layer:</strong> Custom pixel art avatar generation with extensive customization options</li>
                  <li><strong>Personality Layer:</strong> AI-driven personality system with traits, behaviors, and characteristics</li>
                  <li><strong>Token Layer:</strong> Blockchain tokenization on Solana via Pump.fun integration</li>
                </ul>
              </div>

              <h3 className="subsection-title">1.2 Core Innovation</h3>
              <p>
                Each pet becomes a unique, tradeable digital asset that exists both as a visual representation and as a blockchain token, creating a new category of RWA tokens that maintain emotional value while gaining financial utility.
              </p>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">2. SYSTEM ARCHITECTURE</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">2.1 The Engine Core</h3>
              <p>
                The platform operates on a <strong>client-side architecture</strong>, decoupling user interface from blockchain operations. This architecture ensures fast, responsive interactions while maintaining secure blockchain connectivity.
              </p>
              
              <div className="info-box dark-box">
                <div className="box-title">CORE ENGINE PARAMETERS</div>
                <ul>
                  <li><code>Frontend: React + TypeScript UI</code></li>
                  <li><code>Rendering: Canvas-based pixel art renderer</code></li>
                  <li><code>Storage: LocalStorage for pet data persistence</code></li>
                  <li><code>Blockchain: Solana Web3.js integration</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">2.2 Multi-Layer Architecture</h3>
              <p>
                The system is structured in three distinct layers, each handling specific responsibilities while maintaining clear separation of concerns.
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box blue">
                  <div className="box-title">FRONTEND LAYER</div>
                  <ul>
                    <li>React + TypeScript UI</li>
                    <li>Canvas-based pixel art renderer</li>
                    <li>LocalStorage for pet data persistence</li>
                    <li>Real-time pet interaction</li>
                  </ul>
                </div>
                <div className="side-box teal">
                  <div className="box-title">SERVICE LAYER</div>
                  <ul>
                    <li>Pump.fun API integration</li>
                    <li>Solana Web3.js operations</li>
                    <li>IPFS metadata upload</li>
                    <li>Transaction management</li>
                  </ul>
                </div>
              </div>

              <div className="info-box dark-box">
                <div className="box-title">BLOCKCHAIN LAYER</div>
                <ul>
                  <li>Solana mainnet connection via Helius RPC</li>
                  <li>Pump.fun smart contract interaction</li>
                  <li>Token minting and deployment</li>
                  <li>Transaction signing and submission</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">3. PIXEL ART GENERATION SYSTEM</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">3.1 Rendering Engine</h3>
              <p>
                The pixel art generation system creates unique 32x32 pixel avatars through a procedural rendering engine that combines shape algorithms with color customization.
              </p>
              
              <div className="info-box dark-box">
                <div className="box-title">RENDERING PARAMETERS</div>
                <ul>
                  <li><code>Canvas Size: 32x32 pixels</code></li>
                  <li><code>Pet Types: 6 distinct species</code></li>
                  <li><code>Color Depth: Full RGB spectrum</code></li>
                  <li><code>Pattern Support: Spots, stripes, patches</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">3.2 Customization Options</h3>
              <p>
                Users can customize multiple visual aspects of their pet avatar:
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box pink">
                  <div className="box-title">COLOR OPTIONS</div>
                  <ul>
                    <li>Body Color (primary)</li>
                    <li>Eye Color (iris)</li>
                    <li>Pattern Color (optional)</li>
                    <li>Accessory Colors</li>
                  </ul>
                </div>
                <div className="side-box purple">
                  <div className="box-title">RENDERING STAGES</div>
                  <ul>
                    <li>Base body shape</li>
                    <li>Pattern overlay</li>
                    <li>Facial features</li>
                    <li>Final output</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">4. AI PERSONALITY ENGINE</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">4.1 Core Personality Traits</h3>
              <p>
                Each pet receives a unique AI personality system that defines behavior, interaction style, and characteristics.
              </p>

              <div className="info-box dark-box">
                <div className="box-title">PERSONALITY ATTRIBUTES</div>
                <ul>
                  <li><code>Name: User-defined pet name</code></li>
                  <li><code>Temperament: friendly, shy, energetic, calm, playful, lazy</code></li>
                  <li><code>Activity Level: 0-100 scale</code></li>
                  <li><code>Loves Humans: Boolean social preference</code></li>
                  <li><code>Playful: Boolean playfulness flag</code></li>
                  <li><code>Favorite Food: Custom preference</code></li>
                  <li><code>Bio: Optional description</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">4.2 Behavioral Impact</h3>
              <p>
                Personality traits directly influence multiple aspects of the pet's digital existence:
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box green">
                  <div className="box-title">INTERACTION EFFECTS</div>
                  <ul>
                    <li>Chat response style</li>
                    <li>Conversation tone</li>
                    <li>Mood indicators</li>
                    <li>Activity patterns</li>
                  </ul>
                </div>
                <div className="side-box orange">
                  <div className="box-title">DISPLAY EFFECTS</div>
                  <ul>
                    <li>Token metadata</li>
                    <li>Pet card appearance</li>
                    <li>Status indicators</li>
                    <li>Visual characteristics</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">5. TOKEN CREATION PROCESS</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">5.1 Process Pipeline</h3>
              <p>
                The token creation process follows a multi-step pipeline from visual design to blockchain deployment.
              </p>

              <div className="info-box dark-box">
                <div className="box-title">CREATION STAGES</div>
                <ul>
                  <li><code>Stage 1: Metadata Preparation</code></li>
                  <li><code>Stage 2: IPFS Upload</code></li>
                  <li><code>Stage 3: Blockchain Transaction</code></li>
                  <li><code>Stage 4: Token Deployment</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">5.2 Metadata & IPFS</h3>
              <p>
                Before blockchain deployment, all pet data is prepared and stored on IPFS:
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box yellow">
                  <div className="box-title">METADATA PREP</div>
                  <ul>
                    <li>Image → PNG blob</li>
                    <li>Name & symbol</li>
                    <li>Description generation</li>
                    <li>Website URL</li>
                  </ul>
                </div>
                <div className="side-box teal">
                  <div className="box-title">IPFS UPLOAD</div>
                  <ul>
                    <li>FormData assembly</li>
                    <li>Pump.fun API call</li>
                    <li>Metadata URI returned</li>
                    <li>URI stored on-chain</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">5.3 Blockchain Transaction</h3>
              <p>
                The transaction process handles wallet operations and smart contract interaction:
              </p>

              <div className="info-box dark-box">
                <div className="box-title">TRANSACTION FLOW</div>
                <ul>
                  <li><code>1. Wallet initialization from private key</code></li>
                  <li><code>2. Mint keypair generation</code></li>
                  <li><code>3. Pump.fun SDK instruction creation</code></li>
                  <li><code>4. Transaction assembly & signing</code></li>
                  <li><code>5. RPC submission to Solana</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">6. BLOCKCHAIN INTEGRATION</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">6.1 Solana Network</h3>
              <p>
                The platform connects to Solana mainnet via Helius RPC endpoint, leveraging Solana's high-performance blockchain infrastructure.
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box purple">
                  <div className="box-title">SOLANA BENEFITS</div>
                  <ul>
                    <li>Fast transaction processing</li>
                    <li>Low transaction fees</li>
                    <li>High throughput capability</li>
                    <li>Robust ecosystem</li>
                  </ul>
                </div>
                <div className="side-box blue">
                  <div className="box-title">HELIUS RPC</div>
                  <ul>
                    <li>Reliable API endpoint</li>
                    <li>Enhanced performance</li>
                    <li>WebSocket support</li>
                    <li>Rate limit handling</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">6.2 Pump.fun Integration</h3>
              <p>
                Pump.fun provides a decentralized token launchpad with automated token creation and liquidity mechanisms.
              </p>

              <div className="info-box dark-box">
                <div className="box-title">PUMP.FUN FEATURES</div>
                <ul>
                  <li><code>Automated token creation via smart contracts</code></li>
                  <li><code>Bonding curve mechanism for price discovery</code></li>
                  <li><code>Built-in liquidity pools</code></li>
                  <li><code>IPFS metadata storage</code></li>
                  <li><code>Program ID: 6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">7. USER EXPERIENCE FLOW</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">7.1 Creation Workflow</h3>
              <p>
                The user journey from initial design to token deployment follows a streamlined process:
              </p>

              <div className="info-box dark-box">
                <div className="box-title">CREATION STEPS</div>
                <ul>
                  <li><code>Step 1: Appearance Design (type, colors)</code></li>
                  <li><code>Step 2: Personality Setup (traits, bio)</code></li>
                  <li><code>Step 3: Preview Generation</code></li>
                  <li><code>Step 4: Launch & Tokenization</code></li>
                  <li><code>Step 5: Completion & Token Address</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">7.2 Post-Creation Features</h3>
              <p>
                After creation, users have access to multiple interaction and management features:
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box green">
                  <div className="box-title">INTERACTION</div>
                  <ul>
                    <li>View pet profile</li>
                    <li>Chat with pet (AI)</li>
                    <li>Monitor stats</li>
                    <li>Track activity</li>
                  </ul>
                </div>
                <div className="side-box pink">
                  <div className="box-title">SHARING</div>
                  <ul>
                    <li>Pump.fun token link</li>
                    <li>Unique pet URL</li>
                    <li>Social sharing</li>
                    <li>Gallery display</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">7.3 Data Persistence</h3>
              <p>
                All pet data persists locally using browser storage:
              </p>

              <div className="info-box yellow">
                <div className="box-title">STORED DATA</div>
                <ul>
                  <li>Pet appearance configuration</li>
                  <li>Personality traits and settings</li>
                  <li>Token address (if deployed)</li>
                  <li>Stats and interaction history</li>
                  <li>Image data (base64)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="document-section">
          <div className="section-header">
            <div className="section-icon">■</div>
            <h2 className="section-title">8. TECHNICAL IMPLEMENTATION</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <h3 className="subsection-title">8.1 Technology Stack</h3>
              <p>
                The platform is built using modern web technologies optimized for performance and developer experience.
              </p>

              <div className="info-box dark-box">
                <div className="box-title">TECH STACK</div>
                <ul>
                  <li><code>Frontend: React 18, TypeScript, Vite</code></li>
                  <li><code>Styling: CSS Modules, Custom Properties</code></li>
                  <li><code>Blockchain: @solana/web3.js, @pump-fun/pump-sdk</code></li>
                  <li><code>RPC: Helius API endpoint</code></li>
                  <li><code>Storage: Browser localStorage</code></li>
                </ul>
              </div>

              <h3 className="subsection-title">8.2 Key Dependencies</h3>
              <p>
                Core dependencies handle blockchain operations, routing, and data management:
              </p>

              <div className="side-by-side-boxes">
                <div className="side-box red">
                  <div className="box-title">BLOCKCHAIN</div>
                  <ul>
                    <li>@solana/web3.js</li>
                    <li>@pump-fun/pump-sdk</li>
                    <li>bs58 encoding</li>
                    <li>Helius RPC</li>
                  </ul>
                </div>
                <div className="side-box orange">
                  <div className="box-title">FRONTEND</div>
                  <ul>
                    <li>react-router-dom</li>
                    <li>uuid generation</li>
                    <li>Canvas API</li>
                    <li>LocalStorage</li>
                  </ul>
                </div>
              </div>

              <h3 className="subsection-title">8.3 Security & Performance</h3>
              <p>
                The platform implements multiple security measures and performance optimizations:
              </p>

              <div className="info-box green">
                <div className="box-title">SECURITY MEASURES</div>
                <ul>
                  <li>Private keys in environment variables</li>
                  <li>CORS proxy for API calls</li>
                  <li>Client-side transaction signing</li>
                  <li>No server-side key storage</li>
                </ul>
              </div>

              <div className="info-box dark-box">
                <div className="box-title">PERFORMANCE OPTIMIZATIONS</div>
                <ul>
                  <li><code>Lazy loading of blockchain libraries</code></li>
                  <li><code>Canvas-based pixel art rendering</code></li>
                  <li><code>LocalStorage for instant access</code></li>
                  <li><code>Fast transaction sending (no wait)</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="document-section conclusion-section">
          <div className="section-header">
            <div className="section-icon">▲</div>
            <h2 className="section-title">CONCLUSION</h2>
          </div>
          <div className="content-box">
            <div className="document-content">
              <p>
                Project Pets represents a novel approach to RWA tokenization, combining emotional connection, digital art, and blockchain technology. By enabling users to create, personalize, and tokenize their pets, the platform bridges the gap between traditional pet ownership and the emerging world of digital assets. The integration with Pump.fun provides a seamless path from creation to tokenization, making blockchain technology accessible to users without deep technical knowledge.
              </p>
              <p>
                The platform demonstrates how blockchain technology can be applied to create meaningful, personalized digital assets that maintain emotional value while gaining financial utility through tokenization. Each pet becomes a unique, tradeable asset that exists both as a visual representation and as a blockchain token, creating a new category of collectible tokens on Solana.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

