import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import VideoCall from '@/components/VideoCall';
import KelanAssistant from '@/components/KelanAssistant';
import ProfileSettings from '@/components/ProfileSettings';
import DialPad from '@/components/DialPad';
import CreateGroup from '@/components/CreateGroup';

type TabType = 'chats' | 'calls' | 'contacts' | 'groups' | 'communities' | 'kelan' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chats');
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showDialPad, setShowDialPad] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const chatsData = [
    { id: 1, name: 'Анна Иванова', avatar: '', lastMessage: 'Привет! Как дела?', time: '14:32', unread: 3, online: true },
    { id: 2, name: 'Дмитрий Петров', avatar: '', lastMessage: 'Отправил файлы', time: '13:15', unread: 0, online: false },
    { id: 3, name: 'AI Team', avatar: '', lastMessage: 'Встреча через 30 минут', time: '12:45', unread: 1, online: true },
  ];

  const contactsData = [
    { id: 1, name: 'Мария Смирнова', phone: '+7 999 123-45-67', status: 'В сети' },
    { id: 2, name: 'Алексей Козлов', phone: '+7 999 765-43-21', status: 'Был(а) час назад' },
    { id: 3, name: 'Елена Волкова', phone: '+7 999 555-00-11', status: 'В сети' },
  ];

  const callsData = [
    { id: 1, name: 'Анна Иванова', type: 'video', direction: 'incoming', time: '14:32', duration: '15:23' },
    { id: 2, name: 'Дмитрий Петров', type: 'audio', direction: 'outgoing', time: '13:15', duration: '5:42' },
    { id: 3, name: 'AI Team', type: 'video', direction: 'missed', time: '12:45', duration: '-' },
  ];

  const renderChats = () => (
    <div className="space-y-2">
      {chatsData.map((chat) => (
        <div key={chat.id} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-14 w-14 border-2 border-primary/50">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-foreground truncate">{chat.name}</h3>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <Badge className="bg-primary text-white ml-2 px-2 py-0.5 neon-glow">{chat.unread}</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCalls = () => (
    <div className="space-y-2">
      {callsData.map((call) => (
        <div key={call.id} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer group">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                {call.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{call.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon 
                  name={call.direction === 'incoming' ? 'PhoneIncoming' : call.direction === 'outgoing' ? 'PhoneOutgoing' : 'PhoneMissed'} 
                  size={16} 
                />
                <span>{call.direction === 'incoming' ? 'Входящий' : call.direction === 'outgoing' ? 'Исходящий' : 'Пропущенный'}</span>
                <span>• {call.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{call.duration}</span>
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-primary/20">
                <Icon name={call.type === 'video' ? 'Video' : 'Phone'} size={20} />
              </Button>
            </div>
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button 
          onClick={() => setShowVideoCall(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12 rounded-2xl neon-glow"
        >
          <Icon name="Video" size={20} className="mr-2" />
          Видеозвонок
        </Button>
        <Button 
          onClick={() => setShowDialPad(true)}
          className="bg-gradient-to-r from-secondary to-accent hover:opacity-90 h-12 rounded-2xl neon-glow"
        >
          <Icon name="Smartphone" size={20} className="mr-2" />
          Набрать номер
        </Button>
      </div>
    </div>
  );

  const renderContacts = () => (
    <div className="space-y-2">
      {contactsData.map((contact) => (
        <div key={contact.id} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/50">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white font-semibold">
                {contact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{contact.name}</h3>
              <p className="text-sm text-muted-foreground">{contact.phone}</p>
              <p className="text-xs text-accent mt-1">{contact.status}</p>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-primary/20">
                <Icon name="Phone" size={18} />
              </Button>
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-primary/20">
                <Icon name="MessageCircle" size={18} />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGroups = () => (
    <div className="space-y-2">
      {[
        { id: 1, name: 'Рабочая группа', members: 24, lastActivity: '2 часа назад' },
        { id: 2, name: 'Друзья', members: 12, lastActivity: '30 минут назад' },
        { id: 3, name: 'AI Энтузиасты', members: 156, lastActivity: '5 минут назад' },
      ].map((group) => (
        <div key={group.id} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{group.name}</h3>
              <p className="text-sm text-muted-foreground">{group.members} участников</p>
              <p className="text-xs text-muted-foreground mt-1">Активность: {group.lastActivity}</p>
            </div>
          </div>
        </div>
      ))}
      <Button 
        onClick={() => setShowCreateGroup(true)}
        className="w-full mt-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-12 rounded-2xl neon-glow"
      >
        <Icon name="Plus" size={20} className="mr-2" />
        Создать группу
      </Button>
    </div>
  );

  const renderCommunities = () => (
    <div className="space-y-2">
      {[
        { id: 1, name: 'Tech Community', subscribers: 15420, category: 'Технологии' },
        { id: 2, name: 'AI Innovations', subscribers: 8900, category: 'Искусственный интеллект' },
        { id: 3, name: 'Design Masters', subscribers: 12300, category: 'Дизайн' },
      ].map((community) => (
        <div key={community.id} className="glass-effect rounded-2xl p-4 hover:bg-white/10 transition-all cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">{community.name}</h3>
              <p className="text-sm text-muted-foreground">{community.subscribers.toLocaleString()} подписчиков</p>
              <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">{community.category}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const navItems = [
    { id: 'chats' as TabType, icon: 'MessageSquare', label: 'Чаты', badge: 4 },
    { id: 'calls' as TabType, icon: 'Phone', label: 'Звонки' },
    { id: 'contacts' as TabType, icon: 'Users', label: 'Контакты' },
    { id: 'groups' as TabType, icon: 'UsersRound', label: 'Группы' },
    { id: 'communities' as TabType, icon: 'Globe', label: 'Сообщества' },
    { id: 'kelan' as TabType, icon: 'Sparkles', label: 'Келан' },
    { id: 'profile' as TabType, icon: 'Settings', label: 'Настройки' },
  ];

  if (showVideoCall) {
    return <VideoCall onClose={() => setShowVideoCall(false)} />;
  }

  if (showDialPad) {
    return (
      <DialPad 
        onClose={() => setShowDialPad(false)} 
        onCall={(number, isVideo) => {
          setShowDialPad(false);
          setShowVideoCall(true);
        }}
      />
    );
  }

  if (showCreateGroup) {
    return (
      <CreateGroup 
        onClose={() => setShowCreateGroup(false)} 
        onCreate={(groupName, selectedContacts) => {
          setShowCreateGroup(false);
          setActiveTab('groups');
        }}
      />
    );
  }

  if (activeTab === 'kelan') {
    return <KelanAssistant onBack={() => setActiveTab('chats')} />;
  }

  if (activeTab === 'profile') {
    return <ProfileSettings onBack={() => setActiveTab('chats')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="glass-effect rounded-3xl p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Kelan Messenger
            </h1>
            <div className="flex items-center gap-3">
              <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white/10">
                <Icon name="Search" size={20} />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-primary/50 cursor-pointer" onClick={() => setActiveTab('profile')}>
                <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                  ВЫ
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50"
            />
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-2 mb-6 animate-scale-in">
          <div className="grid grid-cols-7 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  relative p-4 rounded-2xl transition-all duration-300
                  ${activeTab === item.id 
                    ? 'bg-gradient-to-r from-primary to-secondary text-white neon-glow' 
                    : 'hover:bg-white/5 text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon name={item.icon} size={24} />
                  <span className="text-xs font-medium">{item.label}</span>
                  {item.badge && activeTab !== item.id && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-secondary text-white text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Icon name={navItems.find(n => n.id === activeTab)?.icon || 'MessageSquare'} size={28} />
            {navItems.find(n => n.id === activeTab)?.label}
          </h2>
          
          {activeTab === 'chats' && renderChats()}
          {activeTab === 'calls' && renderCalls()}
          {activeTab === 'contacts' && renderContacts()}
          {activeTab === 'groups' && renderGroups()}
          {activeTab === 'communities' && renderCommunities()}
        </div>
      </div>
    </div>
  );
};

export default Index;