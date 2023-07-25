import { IconPipe } from './icon.pipe';

describe('IconPipe', () => {

  it('should return icon src based on active and hovered states', () => {
    const pipe = new IconPipe();
    expect(pipe.transform('image')).toEqual('assets/images/image.svg');
    expect(pipe.transform('image', true)).toEqual('assets/images/image_hover.svg');
    expect(pipe.transform('image', false, false,true)).toEqual('assets/images/image_active.svg');
  });

  it('should prioritize active over hovered', () => {
    const pipe = new IconPipe();
    expect(pipe.transform('image', true, false,true)).toEqual('assets/images/image_active.svg');
  });

  it('should prioritize disabled over hovered and active', () => {
    const pipe = new IconPipe();
    expect(pipe.transform('image', true, true, true)).toEqual('assets/images/image_disabled.svg');
  });
});
