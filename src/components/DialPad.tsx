import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface DialPadProps {
  onClose: () => void;
  onCall: (number: string, isVideo: boolean) => void;
}

const DialPad = ({ onClose, onCall }: DialPadProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleDigitClick = (digit: string) => {
    setPhoneNumber(prev => prev + digit);
  };

  const handleDelete = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
  };

  const handleCall = (isVideo: boolean) => {
    if (phoneNumber.length > 0) {
      onCall(phoneNumber, isVideo);
    }
  };

  const dialPadButtons = [
    { digit: '1', letters: '' },
    { digit: '2', letters: 'ABC' },
    { digit: '3', letters: 'DEF' },
    { digit: '4', letters: 'GHI' },
    { digit: '5', letters: 'JKL' },
    { digit: '6', letters: 'MNO' },
    { digit: '7', letters: 'PQRS' },
    { digit: '8', letters: 'TUV' },
    { digit: '9', letters: 'WXYZ' },
    { digit: '*', letters: '' },
    { digit: '0', letters: '+' },
    { digit: '#', letters: '' },
  ];

  const recentCalls = [
    { name: 'Анна Иванова', number: '+7 999 123-45-67', time: '2 часа назад' },
    { name: 'Дмитрий Петров', number: '+7 999 765-43-21', time: '5 часов назад' },
    { name: 'Мария Смирнова', number: '+7 999 555-00-11', time: 'Вчера' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950/30">
      <div className="max-w-2xl mx-auto p-4 lg:p-8">
        <div className="glass-effect rounded-3xl p-6 mb-6 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-white/10"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Набор номера</h1>
            <div className="w-10" />
          </div>

          <div className="mb-8">
            <div className="relative h-20 flex items-center justify-center mb-4">
              {phoneNumber.length > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-light tracking-wider text-foreground animate-fade-in">
                    {phoneNumber}
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleDelete}
                    className="h-10 w-10 rounded-full hover:bg-white/10"
                  >
                    <Icon name="Delete" size={20} />
                  </Button>
                </div>
              ) : (
                <span className="text-2xl text-muted-foreground">Введите номер</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {dialPadButtons.map((button) => (
              <button
                key={button.digit}
                onClick={() => handleDigitClick(button.digit)}
                className="aspect-square rounded-2xl glass-effect hover:bg-white/10 transition-all hover:scale-105 active:scale-95 flex flex-col items-center justify-center group"
              >
                <span className="text-3xl font-light text-foreground mb-1">
                  {button.digit}
                </span>
                {button.letters && (
                  <span className="text-xs text-muted-foreground tracking-wider">
                    {button.letters}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-6">
            <Button
              size="icon"
              onClick={() => handleCall(false)}
              disabled={phoneNumber.length === 0}
              className="h-16 w-16 rounded-2xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-30 neon-glow"
            >
              <Icon name="Phone" size={28} className="text-white" />
            </Button>
            <Button
              size="icon"
              onClick={() => handleCall(true)}
              disabled={phoneNumber.length === 0}
              className="h-16 w-16 rounded-2xl bg-gradient-to-r from-secondary to-accent hover:opacity-90 disabled:opacity-30 neon-glow"
            >
              <Icon name="Video" size={28} className="text-white" />
            </Button>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-6 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Icon name="Clock" size={24} className="text-primary" />
            Последние звонки
          </h2>
          <div className="space-y-3">
            {recentCalls.map((call, index) => (
              <div
                key={index}
                onClick={() => setPhoneNumber(call.number)}
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer group"
              >
                <Avatar className="h-12 w-12 border-2 border-primary/50">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    {call.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{call.name}</h3>
                  <p className="text-sm text-muted-foreground">{call.number}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{call.time}</span>
                  <Icon name="Phone" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialPad;
