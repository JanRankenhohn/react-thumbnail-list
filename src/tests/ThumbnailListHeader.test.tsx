import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ThumbnailListHeader from '../components/ThumbnailListHeader';

type DummyProps = {
  label: string;
  align?: 'start' | 'end';
};

const DummyItem = ({ label }: DummyProps) => <div data-testid={label}>{label}</div>;

describe('ThumbnailListHeader', () => {
  it('places end-aligned children after start-aligned children', () => {
    render(
      <ThumbnailListHeader>
        <DummyItem label="Start A" align="start" />
        <DummyItem label="End B" align="end" />
        <DummyItem label="Start C" />
      </ThumbnailListHeader>
    );

    const items = screen.getAllByTestId(/Start|End/);

    expect(items.map((el) => el.textContent)).toEqual(['Start A', 'Start C', 'End B']);
  });

  it('defaults children without align prop to start', () => {
    render(
      <ThumbnailListHeader>
        <DummyItem label="Default" />
        <DummyItem label="End" align="end" />
      </ThumbnailListHeader>
    );

    const items = screen.getAllByTestId(/Default|End/);

    expect(items.map((el) => el.textContent)).toEqual(['Default', 'End']);
  });
});
