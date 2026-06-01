import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                <div className="col-span-1 md:col-span-1">
                    <div className="text-3xl font-bold mb-6 flex items-center gap-1">
                        <span className="text-primary">D</span>Mar
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Connecting the Myanmar Community in Dubai for Homes &amp; Food.
                    </p>
                    <div className="flex gap-4">
                        <a className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
                            href="#"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z">
                                </path>
                            </svg></a>
                        <a className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
                            href="#"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12 2C6.477 2 2 6.477 2 12c0 1.891.528 3.66 1.442 5.163L2.054 21.946l4.908-1.288A9.943 9.943 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm4.492 13.52c-.22.615-1.285 1.154-1.774 1.218-.489.064-.997.103-2.926-.665-2.316-.917-3.811-3.266-3.926-3.421-.116-.156-.948-1.258-.948-2.399s.595-1.701.808-1.932c.213-.231.464-.288.618-.288h.442c.154 0 .363-.008.556.463.193.471.66 1.611.718 1.726.058.115.097.25.02.404-.077.154-.116.25-.231.385s-.24.3-.343.415c-.103.115-.212.241-.091.448.121.207.538.889 1.155 1.439.794.708 1.462.928 1.67.1.208-.115.464-.269.585-.461.121-.192.24-.327.425-.385.185-.058.353.05.7.208s1.654.78 1.942.924c.288.144.481.212.558.346s.077.712-.143 1.327z">
                                </path>
                            </svg></a>
                        <a className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:bg-primary hover:border-primary transition"
                            href="#"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path
                                    d="M12.31 3.048c-3.14 0-3.53.014-4.76.071-1.23.057-2.07.252-2.81.54-.76.29-1.41.69-2.05 1.34-.65.64-1.05 1.29-1.35 2.05-.28.74-.48 1.58-.54 2.81-.05 1.23-.07 1.62-.07 4.76s.02 3.53.07 4.76c.06 1.23.26 2.07.54 2.81.3.76.7 1.41 1.35 2.05.64.65 1.29 1.05 2.05 1.35.74.28 1.58.48 2.81.54 1.23.05 1.62.07 4.76.07s3.53-.02 4.76-.07c1.23-.06 2.07-.26 2.81-.54.76-.3 1.41-.7 2.05-1.35.65-.64 1.05-1.29 1.35-2.05.28-.74.48-1.58.54-2.81.05-1.23.07-1.62.07-4.76-.07zM12 18a6 6 0 110-12 6 6 0 010 12zm0-10a4 4 0 100 8 4 4 0 000-8zm6.406-2.194a1.44 1.44 0 10-2.037 2.037 1.44 1.44 0 002.037-2.037z">
                                </path>
                            </svg></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">For Users</h4>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li><Link className="hover:text-white transition" to="/rooms">Find Rooms</Link></li>
                        <li><Link className="hover:text-white transition" to="/foods">Order Food</Link></li>
                        <li><Link className="hover:text-white transition" to="/guide">How it works</Link></li>
                        <li><Link className="hover:text-white transition" to="/account-settings">User Dashboard</Link></li>
                        <li><Link className="hover:text-white transition" to="/about">About Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">For Owners</h4>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li><Link className="hover:text-white transition" to="/add-room">List Your Property</Link></li>
                        <li><Link className="hover:text-white transition" to="/add-food">Post Your Menu</Link></li>
                        <li><Link className="hover:text-white transition" to="/guide">How it works</Link></li>
                        <li><Link className="hover:text-white transition" to="/owner-dashboard">Owner Dashboard</Link></li>
                        <li><Link className="hover:text-white transition" to="/about">About Us</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-primary">Support &amp; Legal</h4>
                    <ul className="space-y-4 text-sm text-slate-400">
                        <li><a className="hover:text-white transition" href="#">Help Center</a></li>
                        <li><a className="hover:text-white transition" href="#">Contact Us</a></li>
                        <li><a className="hover:text-white transition" href="#">Privacy Policy</a></li>
                        <li><a className="hover:text-white transition" href="#">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div
                className="pt-10 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-medium">
                <div>Designed for the Myanmar Community in Dubai.</div>
                <div>© 2026 DMar. All Rights Reserved.</div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
