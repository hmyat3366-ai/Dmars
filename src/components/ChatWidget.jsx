import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ChatWidget = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Wait until auth state is loaded
    if (loading) return;

    // Only load the chat widget for regular users (not for owners or guests)
    if (user && user.role === 'user') {
      const existingScript = document.getElementById('xia-chat-widget');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'xia-chat-widget';
        script.src = 'http://localhost:5005/public/widget.js';
        script.setAttribute('data-workspace-id', '6a4bbc35a78acb77a8a3db3c');
        document.body.appendChild(script);
      }
    } else {
      // Remove the script and any injected chat UI if the user logs out or is an owner
      const existingScript = document.getElementById('xia-chat-widget');
      if (existingScript) {
        existingScript.remove();
      }
      
      // The widget might have injected elements into the DOM, we should clean them up if possible.
      // Usually widgets have an id like 'xia-chat-container' or similar, 
      // but without knowing, we can just let a full page reload handle it, or remove the script.
      const widgetContainer = document.getElementById('xia-chat-root'); // adjust if needed
      if (widgetContainer) {
        widgetContainer.remove();
      }
    }
  }, [user, loading]);

  return null; // This component doesn't render any UI directly
};

export default ChatWidget;
