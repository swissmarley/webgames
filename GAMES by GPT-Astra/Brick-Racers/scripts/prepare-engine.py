"""Prepare the licensed 96 kHz/24-bit recording for seamless Web Audio playback.
Requires ffmpeg. Original archive remains in assets-source/engine for reproducibility.
"""
from pathlib import Path
import array, math, subprocess, json, hashlib
root = Path(__file__).resolve().parents[1]
source = root / 'assets-source/engine/engine-loop/engine-loop-1.wav'
out = root / 'public/audio/engine/engine-loop.wav'
raw = subprocess.check_output(['ffmpeg','-v','error','-i',str(source),'-af','highpass=f=35,lowpass=f=9000','-ar','48000','-f','f32le','-acodec','pcm_f32le','-'])
x = array.array('f'); x.frombytes(raw)
channels=2; frames=len(x)//channels; fade=1920
means=[sum(x[c::2])/frames for c in range(channels)]
for i in range(len(x)):x[i]-=means[i%channels]
y=array.array('f',x[fade*channels:(frames-fade)*channels])
for i in range(fade):
    weight=.5-.5*math.cos(math.pi*i/(fade-1))
    for c in range(channels):y.append(x[(frames-fade+i)*channels+c]*(1-weight)+x[i*channels+c]*weight)
gain=.75/max(abs(v) for v in y)
for i in range(len(y)):y[i]*=gain
out.parent.mkdir(parents=True,exist_ok=True)
subprocess.run(['ffmpeg','-v','error','-y','-f','f32le','-ar','48000','-ac','2','-i','pipe:0','-c:a','pcm_s24le',str(out)],input=y.tobytes(),check=True)
report={'source':'engine-loop-1.wav','sourceSampleRate':96000,'sourceBitDepth':24,'sampleRate':48000,'bitDepth':24,'channels':2,'duration':len(y)/96000,'peak':max(abs(v) for v in y),'rms':math.sqrt(sum(v*v for v in y)/len(y)),'seamStep':max(abs(y[c]-y[-2+c]) for c in range(2)),'crossfadeMs':40,'sha256':hashlib.sha256(out.read_bytes()).hexdigest()}
(root/'public/audio/engine/metadata.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
