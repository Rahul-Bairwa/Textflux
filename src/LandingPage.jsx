import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Tooltip from './components/Tooltip';
import textflux_light from './assets/textflux_light.png';
import { Icon } from "@iconify/react";
const installCmd = 'npm install react-textflux';
const usageCode = `import Editor from 'react-textflux';
import "react-textflux/dist/react-textflux.css";

function App() {
  const [description, setDescription] = React.useState('');
  const mentions = [
    { id: 1, name: 'John Doe', profile_pic: 'https://example.com/john.jpg' },
    { id: 2, name: 'Jane Smith', profile_pic: 'https://example.com/jane.jpg' },
    { id: 3, name: 'Bob Johnson' }
  ];
  const handleMediaUpload = async (file, type) => {
    const toBase64 = file => new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = rej;
      reader.readAsDataURL(file);
    });
    const url = await toBase64(file);
    return { url, type, name: file.name };
  };
  return (
    <Editor
      theme="dark"
      mentions={mentions}
      onMediaUpload={handleMediaUpload}
      value={description}
      onChange={setDescription}
      mediaFullscreen={true}
    />
  );
}`;

const propsTable = [
    { prop: 'theme', type: 'string', default: 'light', desc: "'light' or 'dark'" },
    { prop: 'mentions', type: 'array', default: '[]', desc: 'User objects: [{id, name, profile_pic?}]' },
    { prop: 'onMediaUpload', type: 'function', default: 'undefined', desc: 'Custom upload handler: (file, type) => Promise<{url, type, name}>' },
    { prop: 'value', type: 'string', default: 'undefined', desc: 'Controlled value: HTML string' },
    { prop: 'onChange', type: 'function', default: 'undefined', desc: 'Called with latest HTML string on change' },
    { prop: 'mediaFullscreen', type: 'boolean', default: 'false', desc: 'Enable fullscreen preview for media' },
];

const shortcuts = [
    { action: 'Bold', keys: 'Ctrl+B / Cmd+B' },
    { action: 'Italic', keys: 'Ctrl+I / Cmd+I' },
    { action: 'Underline', keys: 'Ctrl+U / Cmd+U' },
    { action: 'Strikethrough', keys: 'Ctrl+Shift+S / Cmd+Shift+S' },
    { action: 'Blockquote', keys: 'Ctrl+Q / Cmd+Q' },
    { action: 'Ordered List', keys: 'Ctrl+Shift+L / Cmd+Shift+L' },
    { action: 'Unordered List', keys: 'Ctrl+Shift+U / Cmd+Shift+U' },
    { action: 'Code Block', keys: 'Ctrl+K / Cmd+K' },
];

const changelog = [
    'Fixed image/video insert buttons',
    'Improved cursor positioning',
    'Enhanced error handling',
    'Fixed focus management',
    'Improved event handling',
    'Added existing media support',
    'Code block paste/toolbar improvements',
];

const features = [
    {
        icon: 'icon-park-outline:text-bold',
        title: 'Text Formatting',
        desc: 'Bold, italic, underline, strikethrough, blockquote, lists',
    },
    {
        icon: 'mynaui:at',
        title: '@Mentions',
        desc: 'User list with profile pic/initials, keyboard navigation',
    },
    {
        icon: 'fluent:emoji-48-regular',
        title: 'Emoji Picker',
        desc: '200+ emojis, fast search, outside click to close',
    },
    {
        icon: 'octicon:file-media-24',
        title: 'Media Uploads',
        desc: 'Images/videos with fullscreen preview, custom upload logic',
    },
    {
        icon: 'fluent:code-block-48-regular',
        title: 'Code Blocks',
        desc: 'Insert code blocks, auto-format, text wrapping, monospace',
    },
    {
        icon: 'streamline-sharp:light-dark-mode',
        title: 'Light/Dark Theme',
        desc: 'Switchable theme, pure CSS, tf- prefix',
    },
    {
        icon: 'solar:full-screen-bold',
        title: 'Media Fullscreen',
        desc: 'Media preview in fullscreen',
    },
    {
        icon: 'material-symbols-light:lock-outline',
        title: 'CSS Isolation',
        desc: 'All classes prefixed with tf- (no conflicts)',
    },
];

const benefits = [
    {
        icon: 'hugeicons:tick-double-01',
        title: 'Production Ready',
        desc: 'Built for real-world apps — reliable, optimized, and battle-tested.',
    },
    {
        icon: 'material-symbols-light:inbox-customize-outline-rounded',
        title: 'Modular & Customizable',
        desc: 'Enable only what you need. Extend with your own blocks and styles.',
    },
    {
        icon: 'bi:keyboard',
        title: 'Keyboard Accessible',
        desc: 'Fully operable using keyboard — for a better and inclusive UX.',
    },
    {
        icon: 'arcticons:brain-out',
        title: 'Smart Cursor Positioning',
        desc: 'Cursor stays exactly where it should — even with complex content.',
    },
    {
        icon: 'material-symbols-light:lock-outline',
        title: 'CSS Isolation',
        desc: 'All classes are prefixed with tf- to prevent styling conflicts.',
    },
];


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function LandingPage() {
    const [dark, setDark] = useState(true);
    const [copied, setCopied] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    React.useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
    }, [dark]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(installCmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers or mobile
            try {
                const textarea = document.createElement('textarea');
                textarea.value = installCmd;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err2) {
                console.error('Failed to copy: ', err2);
            }
        }
    };

    return (
        <div className={classNames('min-h-screen bg-primary-50 text-zinc-100', dark ? 'dark' : '')}>
            <header className="w-full font-sans sticky bg-primary-50 top-0 left-0 right-0 z-50">
                <div className="max-w-[1440px] w-[88%] mx-auto flex items-center justify-between px-4 md:px-8 py-5">
                    <div className="flex items-center gap-3">
                        <img
                            src={textflux_light}
                            alt="Textflux Logo"
                            className="h-8 w-auto"
                        />
                    </div>
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-white font-semibold text-lg hover:text-blue-400 transition">Features</a>
                        <a href="#usage" className="text-white font-semibold text-lg hover:text-blue-400 transition">Usage</a>
                        <a href="#customization" className="text-white font-semibold text-lg hover:text-blue-400 transition">Customization</a>
                        <a href="#installation" className="text-white font-semibold text-lg hover:text-blue-400 transition">Installation</a>
                        {/* <a href="#react-native" className="text-white font-semibold text-lg hover:text-blue-400 transition">React Native</a> */}
                        <a href="#installation">
                            <button className="ml-4 bg-secondary-50 hover:bg-blue-500 text-white font-bold text-lg px-6 py-3 min-w-40 rounded-xl cursor-pointer shadow-none transition-all">Get Started</button>
                        </a>
                    </nav>
                    {/* Hamburger Button (Mobile) */}
                    <button
                        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Open menu"
                    >
                        {menuOpen ? (
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <Icon icon="ci:hamburger-md" width={24} height={24} className="text-white" />
                        )}
                    </button>
                </div>
                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden bg-primary-50 border-b border-zinc-700 px-4 py-6 w-full animate-fade-in-down">
                        <nav className="flex flex-col gap-4">
                            <a href="#features" className="text-white font-semibold text-lg hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Features</a>
                            <a href="#usage" className="text-white font-semibold text-lg hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Usage</a>
                            <a href="#customization" className="text-white font-semibold text-lg hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Customization</a>
                            <a href="#installation" className="text-white font-semibold text-lg hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>Installation</a>
                            <a href="#react-native" className="text-white font-semibold text-lg hover:text-blue-400 transition" onClick={() => setMenuOpen(false)}>React Native</a>
                            <a href="#installation" className="mt-2">
                                <button className="w-full bg-secondary-50 hover:bg-blue-500 text-white font-bold text-lg px-6 py-3 min-w-40 rounded-xl cursor-pointer shadow-none transition-all" onClick={() => setMenuOpen(false)}>
                                    Get Started
                                </button>
                            </a>
                        </nav>
                    </div>
                )}
                <div className="border-b border-zinc-700 w-full" />
            </header>

            <section className="relative min-h-screen flex items-center justify-center px-2 py-8 md:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 opacity-50"></div>
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto text-center">
                    {/* Logo (desktop only) */}
                    <div className="hidden md:block mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <img
                                src={textflux_light}
                                alt="Textflux Logo"
                                className="h-16 w-auto drop-shadow-lg"
                            />
                        </div>
                    </div>
                    <h2 className="text-xl md:text-3xl font-semibold text-white mb-4 md:mb-6 max-w-full mx-auto leading-relaxed">
                        Reimagine rich text editing in your React app
                    </h2>

                    <p className="text-base md:text-lg text-zinc-300 mb-4 md:mb-8 max-w-full mx-auto leading-relaxed">
                        Built for developers who want flexibility, smart defaults, and zero CSS conflicts. Drop in the editor and start shipping.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6 md:mb-10">
                        <span className="bg-white/10 flex items-center gap-2 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium text-white">
                            <Icon icon="streamline-emojis:sparkles" className="text-base md:text-xl" /> Production Ready
                        </span>
                        <span className="bg-white/10 flex items-center gap-2 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium text-white">
                            <Icon icon="unjs:theme-colors" className="text-base md:text-xl" /> Zero CSS Conflicts
                        </span>
                        <span className="bg-white/10 flex items-center gap-2 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium text-white">
                            <Icon icon="noto:brain" className="text-base md:text-xl" /> Smart Cursor
                        </span>
                        <span className="bg-white/10 flex items-center gap-2 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-xs md:text-sm font-medium text-white">
                            <Icon icon="fluent-emoji:puzzle-piece" className="text-base md:text-xl" /> Fully Customizable
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center mb-6 md:mb-10">
                        <a href="#installation" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-secondary-50 hover:bg-secondary-100 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mb-2 md:mb-0">
                                Get Started
                            </button>
                        </a>
                        <a href="#features" className="w-full md:w-auto">
                            <button className="w-full md:w-auto bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105">
                                View Features
                            </button>
                        </a>
                    </div>

                    {/* Stats */}
                    <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-xs sm:max-w-sm md:max-w-4xl mx-auto">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">200+</div>
                            <div className="text-zinc-400 text-sm md:text-base">Emojis Available</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">0</div>
                            <div className="text-zinc-400 text-sm md:text-base">CSS Conflicts</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">1000+</div>
                            <div className="text-zinc-400 text-sm md:text-base">Weekly Downloads</div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="benefits">
                <h3 className="text-2xl font-bold mb-8">Why Textflux?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {benefits.map((b) => (
                        <div key={b.title} className="bg-primary-100 border border-primary-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200">
                            <Icon icon={b.icon} className="text-3xl mb-3" />
                            <div className="font-semibold  leading-6 text-lg mb-1 text-zinc-100">{b.title}</div>
                            <div className="text-zinc-400 text-sm">{b.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto  py-12" id="features">
                <h3 className="text-2xl font-bold mb-8">Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {features.map((f) => (
                        <div key={f.title} className="bg-primary-100 border border-primary-200 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-lg transition-all duration-200">
                            <Icon icon={f.icon} className="text-3xl mb-3" />
                            <div className="font-semibold text-lg mb-1 text-zinc-100">{f.title}</div>
                            <div className="text-zinc-400 text-sm">{f.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto  py-12" id="installation">
                <h3 className="text-2xl font-bold mb-4">Installation</h3>
                <p className="mb-4 text-zinc-300">Install Textflux using npm or yarn:</p>
                <Tooltip
                    message="Copied!"
                    isVisible={copied}
                    position="top"
                >
                    <div
                        className="w-full flex flex-col sm:flex-row items-stretch bg-zinc-900 border border-zinc-700 rounded-xl p-2 sm:p-4 gap-2 sm:gap-4 cursor-pointer hover:bg-zinc-800 transition-colors duration-200 overflow-x-auto"
                        onClick={handleCopy}
                        tabIndex={0}
                        role="button"
                        aria-label="Copy install command"
                    >
                        <div className="flex-1 min-w-0 overflow-x-auto">
                            <SyntaxHighlighter language="bash" style={dark ? oneDark : oneLight} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
                                {installCmd}
                            </SyntaxHighlighter>
                        </div>
                        <div className="flex items-center gap-2 min-w-max px-2 sm:px-0">
                            <span className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors" aria-live="polite">
                                {copied ? 'Copied!' : 'Click to copy'}
                            </span>
                            <svg className="w-5 h-5 text-zinc-400 group-hover:text-zinc-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>
                </Tooltip>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="usage">
                <h3 className="text-2xl font-bold mb-4">Usage Example</h3>
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 overflow-x-auto">
                    <SyntaxHighlighter language="jsx" style={dark ? oneDark : oneLight} customStyle={{ background: 'transparent', margin: 0, padding: 0 }}>
                        {usageCode}
                    </SyntaxHighlighter>
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="customization">
                <h3 className="text-2xl font-bold mb-4">Customization</h3>
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-6">
                    <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                        <li>Props: <span className="font-mono">theme</span>, <span className="font-mono">mentions</span>, <span className="font-mono">mediaFullscreen</span>, <span className="font-mono">onMediaUpload</span>, <span className="font-mono">value</span>, <span className="font-mono">onChange</span></li>
                        <li>No CSS framework required. All styles are pure CSS with <span className="font-mono">tf-</span> prefix for isolation.</li>
                        <li>Custom upload logic supported via <span className="font-mono">onMediaUpload</span> prop.</li>
                        <li>Theme can be toggled between light and dark.</li>
                    </ul>
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="props">
                <h3 className="text-2xl font-bold mb-4">Props</h3>
                <div className="w-full overflow-x-auto">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg min-w-[600px]">
                        {/* Table Header */}
                        <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-4">
                            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-zinc-300">
                                <div className="col-span-3">Prop</div>
                                <div className="col-span-2">Type</div>
                                <div className="col-span-2">Default</div>
                                <div className="col-span-5">Description</div>
                            </div>
                        </div>
                        {/* Table Body */}
                        <div className="divide-y divide-zinc-700">
                            {propsTable.map((row, index) => (
                                <div 
                                    key={row.prop} 
                                    className="px-6 py-4 hover:bg-zinc-800/50 transition-colors duration-200"
                                >
                                    <div className="grid grid-cols-12 gap-4 text-sm">
                                        <div className="col-span-3">
                                            <code className="text-primary-400 font-mono font-semibold bg-zinc-800 px-2 py-1 rounded text-xs">
                                                {row.prop}
                                            </code>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-zinc-300 font-mono text-xs bg-zinc-800 px-2 py-1 rounded">
                                                {row.type}
                                            </span>
                                        </div>
                                        <div className="col-span-2">
                                            <span className="text-zinc-400 font-mono text-xs">
                                                {row.default}
                                            </span>
                                        </div>
                                        <div className="col-span-5 text-zinc-300 leading-relaxed">
                                            {row.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="shortcuts">
                <h3 className="text-2xl font-bold mb-4">Keyboard Shortcuts</h3>
                <div className="bg-zinc-900 border border-zinc-700 rounded-xl overflow-hidden shadow-lg">
                    {/* Table Header */}
                    <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-4">
                        <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-zinc-300">
                            <div className="col-span-5">Action</div>
                            <div className="col-span-7">Shortcut</div>
                        </div>
                    </div>
                    {/* Table Body */}
                    <div className="divide-y divide-zinc-700">
                        {shortcuts.map((row) => (
                            <div key={row.action} className="px-6 py-4 hover:bg-zinc-800/50 transition-colors duration-200">
                                <div className="grid grid-cols-12 gap-4 text-sm items-center">
                                    <div className="col-span-5 text-zinc-100 font-medium">{row.action}</div>
                                    <div className="col-span-7">
                                        <span className="font-mono text-primary-400 bg-zinc-800 px-2 py-1 rounded text-xs">
                                            {row.keys}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto py-12" id="troubleshooting">
                <h3 className="text-2xl font-bold mb-4">Troubleshooting</h3>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                    <li>Image/Video Insert Buttons Not Working: Ensure file input permissions, check browser console for errors.</li>
                    <li>Vite Import Error: Ensure <span className="font-mono">package.json</span> and Vite config are correct. See README for details.</li>
                    <li>React Context/JSX Runtime Errors: Make sure both app and library use the same React version.</li>
                </ul>
            </section>

            <section className="max-w-[1440px] md:md:w-[80%] w-[88%] w-[88%] mx-auto py-12" id="changelog">
                <h3 className="text-2xl font-bold mb-4">Changelog Highlights</h3>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                    {changelog.map((item, i) => (
                        <li key={i}>{item}</li>
                    ))}
                </ul>
            </section>

            <footer className="w-full border-t border-zinc-800 bg-zinc-950/90 py-6 mt-12">
                <div className="max-w-[1440px] md:w-[80%] w-[88%] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-400 text-sm">
                    <div>© 2025 Textflux.</div>
                    <div>
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">GitHub</a>
                    </div>
                </div>
            </footer>
        </div>
    );
} 