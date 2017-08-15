import { trigger, state, animate, style, transition } from '@angular/animations';

export function fadeIn() {
  return trigger('fadeInAni', [
                state('*',
                    style({
                    opacity: 1,
                    })
                ),
                transition('void => *', [
                    style({
                    opacity: 0
                    }),
                    animate('.5s ease-in')
                ])
            ]);
}