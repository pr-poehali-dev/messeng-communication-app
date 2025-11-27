import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface KelanAssistantProps {
  onBack: () => void;
}

const KelanAssistant = ({ onBack }: KelanAssistantProps) => {
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const messages = [
    { id: 1, type: 'assistant', text: 'Здравствуйте! Я Келан, ваш AI-помощник. Чем могу помочь?', time: '14:30' },
    { id: 2, type: 'user', text: 'Напомни мне о встрече завтра в 15:00', time: '14:31' },
    { id: 3, type: 'assistant', text: 'Конечно! Я создал напоминание о встрече на завтра в 15:00. Вы получите уведомление за 30 минут до начала.', time: '14:31' },
  ];

  const suggestions = [
    'Создать напоминание',
    'Найти сообщения от Анны',
    'Показать статистику звонков',
    'Организовать групповой звонок',
  ];

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="h-screen flex flex-col max-w-5xl mx-auto">
        <div className="glass-effect p-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                variant="ghost"
                onClick={onBack}
                className="h-10 w-10 rounded-full hover:bg-white/10"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent flex items-center gap-2">
                  <Icon name="Sparkles" size={28} />
                  Келан
                </h1>
                <p className="text-sm text-muted-foreground">AI-помощник</p>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50 ai-pulse">
              Онлайн
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex justify-center mb-8 animate-scale-in">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center neon-glow ai-pulse">
                <Icon name="Sparkles" size={64} className="text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent animate-ping opacity-20" />
            </div>
          </div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-primary to-secondary neon-glow'
                    : 'glass-effect'
                } rounded-2xl p-4`}
              >
                <p className="text-foreground mb-2">{message.text}</p>
                <span className="text-xs text-muted-foreground">{message.time}</span>
              </div>
            </div>
          ))}

          <div className="glass-effect rounded-2xl p-4 animate-fade-in">
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Предложения
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-left text-sm text-foreground transition-all hover:scale-105"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 animate-fade-in">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Icon name="Zap" size={20} className="text-primary" />
              Возможности Келана
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <Icon name="Calendar" size={24} className="text-primary mb-2" />
                <h4 className="font-semibold mb-1">Управление задачами</h4>
                <p className="text-xs text-muted-foreground">Создание напоминаний и планирование встреч</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <Icon name="Search" size={24} className="text-secondary mb-2" />
                <h4 className="font-semibold mb-1">Умный поиск</h4>
                <p className="text-xs text-muted-foreground">Поиск по всем сообщениям и контактам</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer">
                <Icon name="BarChart" size={24} className="text-accent mb-2" />
                <h4 className="font-semibold mb-1">Аналитика</h4>
                <p className="text-xs text-muted-foreground">Статистика звонков и сообщений</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-effect p-6 animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-end gap-3">
              <div className="flex-1">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Спросите Келана о чём угодно..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="h-14 pl-5 pr-14 bg-white/10 border-white/20 rounded-2xl text-foreground placeholder:text-muted-foreground focus:border-primary/50"
                  />
                  <Button
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-transparent hover:bg-white/10"
                  >
                    <Icon name="Paperclip" size={20} />
                  </Button>
                </div>
              </div>

              <Button
                size="icon"
                onClick={handleVoiceInput}
                className={`h-14 w-14 rounded-2xl ${
                  isListening
                    ? 'bg-gradient-to-r from-primary to-secondary neon-glow'
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <Icon name={isListening ? 'MicOff' : 'Mic'} size={24} />
              </Button>

              <Button
                size="icon"
                className="h-14 w-14 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 neon-glow"
              >
                <Icon name="Send" size={24} />
              </Button>
            </div>

            {isListening && (
              <div className="mt-4 flex items-center justify-center gap-2 text-primary animate-fade-in">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium">Слушаю...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KelanAssistant;
