
import { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Search, Circle } from "lucide-react";
import { LanguageContext } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
}

interface Conversation {
  id: string;
  supplierName: string;
  supplierAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

// Accept initialMessageSupplier as a prop
interface MessagingSectionProps {
  initialMessageSupplier?: {
    id: number;
    name: string;
    rating: string;
    reviews: number;
    price: string;
    isDefault?: boolean;
  } | null;
}

const MessagingSection = ({ initialMessageSupplier }: MessagingSectionProps) => {
  const { t } = useContext(LanguageContext);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      supplierName: 'Fresh Foods Algeria',
      supplierAvatar: '/placeholder.svg',
      lastMessage: 'Thank you for your order! We will deliver tomorrow.',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: '1',
          text: 'Hello! I would like to place an order for orange juice.',
          timestamp: '9:15 AM',
          isFromMe: true
        },
        {
          id: '2',
          text: 'Hello! Sure, how many bottles would you like?',
          timestamp: '9:20 AM',
          isFromMe: false
        },
        {
          id: '3',
          text: 'I need 50 bottles for this week.',
          timestamp: '9:25 AM',
          isFromMe: true
        },
        {
          id: '4',
          text: 'Perfect! That will be 7,500 DZD. When do you need them?',
          timestamp: '9:30 AM',
          isFromMe: false
        },
        {
          id: '5',
          text: 'Tomorrow morning would be great.',
          timestamp: '10:00 AM',
          isFromMe: true
        },
        {
          id: '6',
          text: 'Thank you for your order! We will deliver tomorrow.',
          timestamp: '10:30 AM',
          isFromMe: false
        }
      ]
    },
    {
      id: '2',
      supplierName: 'Dairy Excellence',
      supplierAvatar: '/placeholder.svg',
      lastMessage: 'The fresh milk delivery is confirmed for today.',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: '1',
          text: 'Hi, do you have fresh milk available?',
          timestamp: 'Yesterday 2:00 PM',
          isFromMe: true
        },
        {
          id: '2',
          text: 'Yes, we have fresh milk from this morning. How much do you need?',
          timestamp: 'Yesterday 2:05 PM',
          isFromMe: false
        },
        {
          id: '3',
          text: 'I need 20 liters please.',
          timestamp: 'Yesterday 2:10 PM',
          isFromMe: true
        },
        {
          id: '4',
          text: 'The fresh milk delivery is confirmed for today.',
          timestamp: 'Yesterday 2:15 PM',
          isFromMe: false
        }
      ]
    },
    {
      id: '3',
      supplierName: 'Snack Masters',
      supplierAvatar: '/placeholder.svg',
      lastMessage: 'We have new chocolate varieties available.',
      lastMessageTime: '2 days ago',
      unreadCount: 1,
      isOnline: true,
      messages: [
        {
          id: '1',
          text: 'Hi! I saw you have chocolate bars. What varieties do you have?',
          timestamp: '2 days ago 11:00 AM',
          isFromMe: true
        },
        {
          id: '2',
          text: 'We have new chocolate varieties available.',
          timestamp: '2 days ago 11:30 AM',
          isFromMe: false
        }
      ]
    }
  ]);
  
  // Effect: If initialMessageSupplier is provided, open (or create) its conversation
  useEffect(() => {
    if (initialMessageSupplier) {
      // Check if we already have a conversation for this supplier by name
      let conversation = conversations.find(
        (c) => c.supplierName === initialMessageSupplier.name
      );
      if (!conversation) {
        // Create a new, empty conversation for this supplier
        conversation = {
          id: `${initialMessageSupplier.id}`,
          supplierName: initialMessageSupplier.name,
          supplierAvatar: '/placeholder.svg',
          lastMessage: '',
          lastMessageTime: '',
          unreadCount: 0,
          isOnline: true,
          messages: []
        };
        setConversations((prev) => [...prev, conversation!]);
      }
      setSelectedConversation(conversation.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessageSupplier]);

  const filteredConversations = conversations.filter(conversation =>
    conversation.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              messages: [
                ...conv.messages,
                {
                  id: String(conv.messages.length + 1),
                  text: newMessage,
                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  isFromMe: true,
                },
              ],
              lastMessage: newMessage,
              lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              unreadCount: 0,
            }
          : conv
      )
    );
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[600px] flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <MessageSquare className="w-6 h-6 text-[#0794FE]" />
            <h2 className="text-xl font-bold text-gray-800">{t('messages')}</h2>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={t('search_supplier')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100%-120px)]">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-[#0794FE]' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={conversation.supplierAvatar}
                    alt={conversation.supplierName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    conversation.isOnline ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm truncate">{conversation.supplierName}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-[#0794FE] text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Circle className={`w-2 h-2 ${conversation.isOnline ? 'fill-green-400 text-green-400' : 'fill-gray-400 text-gray-400'}`} />
                    <span className="text-xs text-gray-500">
                      {conversation.isOnline ? t('online') : t('offline')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={selectedConv.supplierAvatar}
                    alt={selectedConv.supplierName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    selectedConv.isOnline ? 'bg-green-400' : 'bg-gray-400'
                  }`}></div>
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConv.supplierName}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedConv.isOnline ? t('online') : `${t('last_seen')} ${selectedConv.lastMessageTime}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {selectedConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isFromMe
                        ? 'bg-[#0794FE] text-white'
                        : 'bg-white text-gray-800 border'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.isFromMe ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <Input
                  placeholder={t('type_message')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : initialMessageSupplier ? (
          // If a supplier is set but conversation not loaded yet
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <img src="/placeholder.svg" alt={initialMessageSupplier.name} className="w-16 h-16 rounded-full mb-4"/>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{initialMessageSupplier.name}</h3>
            <p className="text-gray-500">{t('start_conversation')}</p>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('select_conversation')}</h3>
              <p className="text-gray-500">{t('start_conversation')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingSection;
