Write comprehensive tests for: $ARGUMENTS

As a precise guideline, read first the well done tests: `projects/ng-zealous/alert/alert.spec.ts`.

Here's another example based on a simple component:

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, model, signal, twoWayBinding, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: '<button (click)="increment()">{{ count() }}</button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Counter {
  readonly count = model(0);

  protected increment() {
    this.count.update((count) => count + 1);
  }
}

describe('Counter', () => {
  let component: Counter;
  let fixture: ComponentFixture<Counter>;
  let compiled: HTMLElement;

  let count: WritableSignal<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Counter],
    }).compileComponents();

    count = signal(0);

    fixture = TestBed.createComponent(Counter, {
      bindings: [twoWayBinding('count', count)],
    });

    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use input default values when created without bindings', async () => {
    const _fixture = TestBed.createComponent(Counter);
    const _compiled = _fixture.nativeElement;
    await fixture.whenStable();

    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('0');
  });

  it('should set the count based on the input', async () => {
    const button = compiled.querySelector('button');

    count.set(1);
    await fixture.whenStable();

    expect(button?.textContent).toContain('1');
  });

  it('should increment the count when clicking on the button', async () => {
    const button = compiled.querySelector('button');

    button?.click();
    await fixture.whenStable();

    expect(button?.textContent).toContain('1');
  });
});
```

Guidelines:

- Focus on DOM testing (not class testing)
- Use `bindings` option in `TestBed.createComponent(..., { bindings: [] })`
- Use `inputBinding`, `outputBinding` and `twoWayBinding` from `@angular/core`

## Testing Philosophy: Don't Test Angular's Framework

**IMPORTANT**: We are testing the component's logic, NOT Angular's reactivity system.

### What to test (one-shot state tests):

- ✅ Set up a specific state → verify the DOM output
- ✅ Test component logic (transforms, computations, priority)
- ✅ Test user interactions (clicks, input events) → verify the outcome
- ✅ Test edge cases and input variations
- ✅ Test CSS classes, structure, accessibility

### What NOT to test:

- ❌ Don't test that changing a signal updates the DOM (that's Angular's job)
- ❌ Don't test "before/after" signal changes unless testing user interactions
- ❌ Don't verify that Angular's reactivity works

### Examples:

**Bad test** (testing Angular's reactivity):

```ts
it('should update icon when changed', async () => {
  icon.set('account_circle');
  await fixture.whenStable();
  expect(iconEl?.textContent).toBe('account_circle');

  icon.set('person'); // ❌ Testing that Angular updates when signal changes
  await fixture.whenStable();
  expect(iconEl?.textContent).toBe('person');
});
```

**Good test** (testing component state):

```ts
it('should display custom icon', async () => {
  icon.set('face'); // ✅ Set up state
  await fixture.whenStable();

  const iconEl = compiled.querySelector('.z-avatar__icon');
  expect(iconEl?.textContent?.trim()).toBe('face'); // ✅ Verify output
});
```

**Good test** (testing user interaction):

```ts
it('should increment count when clicking button', async () => {
  const button = compiled.querySelector('button');

  button?.click(); // ✅ User interaction
  await fixture.whenStable();

  expect(button?.textContent).toContain('1'); // ✅ Verify outcome
});
```

To run the tests, run: `npm run test:lib`.

**IMPORTANT**: Do NOT add any arguments like `-- button` or `-- <component-name>` when running tests. Always use just `npm run test:lib` to run all library tests.
