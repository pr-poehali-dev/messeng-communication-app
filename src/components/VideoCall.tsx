import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface VideoCallProps {
  onClose: () => void;
}

const VideoCall = ({ onClose }: VideoCallProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const participants = [
    { id: 1, name: 'Вы', isMuted: isMuted, isVideoOff: isVideoOff },
    { id: 2, name: 'Анна Иванова', isMuted: false, isVideoOff: false },
    { id: 3, name: 'Дмитрий Петров', isMuted: true, isVideoOff: false },
    { id: 4, name: 'Мария Смирнова', isMuted: false, isVideoOff: true },
  ];

  const chatMessages = [
    { id: 1, sender: 'Анна Иванова', message: 'Всем привет!', time: '14:32' },
    { id: 2, sender: 'Дмитрий Петров', message: 'Отличное качество связи', time: '14:33' },
  ];

  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative">
          <div className="absolute top-6 left-6 z-10 glass-effect rounded-2xl px-6 py-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white font-medium">Групповой звонок</span>
              <Badge className="bg-white/20 text-white border-none">45:23</Badge>
            </div>
          </div>

          <div className="absolute top-6 right-6 z-10 flex gap-3 animate-fade-in">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowParticipants(!showParticipants)}
              className="h-12 w-12 rounded-2xl glass-effect hover:bg-white/20 text-white"
            >
              <Icon name="Users" size={20} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowChat(!showChat)}
              className="h-12 w-12 rounded-2xl glass-effect hover:bg-white/20 text-white"
            >
              <Icon name="MessageSquare" size={20} />
            </Button>
          </div>

          <div className="h-full grid grid-cols-2 gap-4 p-6">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center animate-scale-in"
              >
                {participant.isVideoOff ? (
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32 border-4 border-white/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-white text-xl font-semibold">{participant.name}</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                )}

                <div className="absolute bottom-6 left-6 glass-effect rounded-xl px-4 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{participant.name}</span>
                    {participant.isMuted && (
                      <Icon name="MicOff" size={16} className="text-red-400" />
                    )}
                  </div>
                </div>

                {participant.id === 1 && (
                  <div className="absolute bottom-6 right-6">
                    <Badge className="bg-primary text-white px-3 py-1 neon-glow">Вы</Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {showParticipants && (
            <div className="absolute right-24 top-20 w-80 glass-effect rounded-2xl p-4 animate-slide-in-right">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Icon name="Users" size={20} />
                Участники ({participants.length}/100)
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-sm">
                        {participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{participant.name}</p>
                    </div>
                    {participant.isMuted && <Icon name="MicOff" size={16} className="text-red-400" />}
                    {participant.isVideoOff && <Icon name="VideoOff" size={16} className="text-yellow-400" />}
                  </div>
                ))}
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/80">
                <Icon name="UserPlus" size={16} className="mr-2" />
                Пригласить участников
              </Button>
            </div>
          )}

          {showChat && (
            <div className="absolute right-24 top-20 w-96 h-[calc(100vh-240px)] glass-effect rounded-2xl p-4 flex flex-col animate-slide-in-right">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Icon name="MessageSquare" size={20} />
                Чат звонка
              </h3>
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="bg-white/10 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium text-sm">{msg.sender}</span>
                      <span className="text-white/50 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-white/90 text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Написать сообщение..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                />
                <Button size="icon" className="bg-primary hover:bg-primary/80">
                  <Icon name="Send" size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 glass-effect">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
            <Button
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className={`h-14 w-14 rounded-2xl ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'}`}
            >
              <Icon name={isMuted ? 'MicOff' : 'Mic'} size={24} className="text-white" />
            </Button>

            <Button
              size="icon"
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`h-14 w-14 rounded-2xl ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'}`}
            >
              <Icon name={isVideoOff ? 'VideoOff' : 'Video'} size={24} className="text-white" />
            </Button>

            <Button
              size="icon"
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`h-14 w-14 rounded-2xl ${isScreenSharing ? 'bg-primary neon-glow' : 'bg-white/20 hover:bg-white/30'}`}
            >
              <Icon name="Monitor" size={24} className="text-white" />
            </Button>

            <Button
              size="icon"
              className="h-14 w-14 rounded-2xl bg-white/20 hover:bg-white/30"
            >
              <Icon name="Settings" size={24} className="text-white" />
            </Button>

            <div className="w-px h-10 bg-white/20 mx-2" />

            <Button
              size="icon"
              onClick={onClose}
              className="h-14 w-14 rounded-2xl bg-red-500 hover:bg-red-600"
            >
              <Icon name="PhoneOff" size={24} className="text-white" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
