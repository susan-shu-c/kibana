/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Actions, ActionsProps } from './actions';
import { EuiThemeProvider } from '@elastic/eui';
import {
  GRAPH_ACTIONS_INVESTIGATE_IN_TIMELINE_ID,
  GRAPH_ACTIONS_TOGGLE_SEARCH_ID,
} from '../test_ids';

const defaultProps: ActionsProps = {
  showToggleSearch: true,
  showInvestigateInTimeline: true,
  onSearchToggle: jest.fn(),
  onInvestigateInTimeline: jest.fn(),
  searchFilterCounter: 0,
};

const renderWithProviders = (props: ActionsProps = defaultProps) => {
  return render(
    <EuiThemeProvider>
      <Actions {...props} />
    </EuiThemeProvider>
  );
};

describe('Actions component', () => {
  it('renders toggle search button', () => {
    const { getByTestId, getByLabelText } = renderWithProviders();

    expect(getByTestId(GRAPH_ACTIONS_TOGGLE_SEARCH_ID)).toBeInTheDocument();
    expect(getByLabelText('Toggle search bar')).toBeInTheDocument();
  });

  it('renders investigate in timeline button', () => {
    const { getByTestId, getByLabelText } = renderWithProviders();

    expect(getByTestId(GRAPH_ACTIONS_TOGGLE_SEARCH_ID)).toBeInTheDocument();
    expect(getByLabelText('Investigate in timeline')).toBeInTheDocument();
  });

  it('calls onSearchToggle when toggle search button is clicked', () => {
    const { getByTestId } = renderWithProviders();

    fireEvent.click(getByTestId(GRAPH_ACTIONS_TOGGLE_SEARCH_ID));

    expect(defaultProps.onSearchToggle).toHaveBeenCalledWith(true);
  });

  it('calls onInvestigateInTimeline when investigate in timeline button is clicked', () => {
    const { getByTestId } = renderWithProviders();

    fireEvent.click(getByTestId(GRAPH_ACTIONS_INVESTIGATE_IN_TIMELINE_ID));

    expect(defaultProps.onInvestigateInTimeline).toHaveBeenCalled();
  });

  it('does not render toggle search button when showToggleSearch is false', () => {
    const { queryByTestId, queryByLabelText } = renderWithProviders({
      ...defaultProps,
      showToggleSearch: false,
    });
    expect(queryByTestId(GRAPH_ACTIONS_TOGGLE_SEARCH_ID)).not.toBeInTheDocument();
    expect(queryByLabelText('Toggle search bar')).not.toBeInTheDocument();
  });

  it('does not render investigate in timeline button when showInvestigateInTimeline is false', () => {
    const { queryByTestId, queryByLabelText } = renderWithProviders({
      ...defaultProps,
      showInvestigateInTimeline: false,
    });
    expect(queryByTestId(GRAPH_ACTIONS_INVESTIGATE_IN_TIMELINE_ID)).not.toBeInTheDocument();
    expect(queryByLabelText('Investigate in timeline')).not.toBeInTheDocument();
  });

  it('does not render search filter counter badge when searchFilterCounter is equal to 0', () => {
    const { queryByText } = renderWithProviders({ ...defaultProps, searchFilterCounter: 0 });
    expect(queryByText('0')).not.toBeInTheDocument();
  });

  it('renders search filter counter badge when searchFilterCounter is greater than 0', () => {
    const { getByText } = renderWithProviders({ ...defaultProps, searchFilterCounter: 5 });
    expect(getByText('5')).toBeInTheDocument();
  });

  it('renders "9" in search filter counter badge when searchFilterCounter is equal to 9', () => {
    const { getByText } = renderWithProviders({ ...defaultProps, searchFilterCounter: 9 });
    expect(getByText('9')).toBeInTheDocument();
  });

  it('renders "9+" in search filter counter badge when searchFilterCounter is greater than 9', () => {
    const { getByText } = renderWithProviders({ ...defaultProps, searchFilterCounter: 10 });
    expect(getByText('9+')).toBeInTheDocument();
  });
});
