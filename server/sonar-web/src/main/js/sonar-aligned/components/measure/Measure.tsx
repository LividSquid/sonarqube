/*
 * SonarQube
 * Copyright (C) 2009-2024 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import classNames from 'classnames';
import { QualityGateIndicator, RatingEnum } from 'design-system';
import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { formatMeasure } from '~sonar-aligned/helpers/measures';
import { Status } from '~sonar-aligned/types/common';
import { MetricKey, MetricType } from '~sonar-aligned/types/metrics';
import RatingComponent from '../../../app/components/metrics/RatingComponent';
import RatingTooltipContent from '../../../components/measure/RatingTooltipContent';
import { BranchLike } from '../../../types/branch-like';

interface Props {
  badgeSize?: 'xs' | 'sm' | 'md';
  branchLike?: BranchLike;
  className?: string;
  componentKey: string;
  decimals?: number;
  fontClassName?: `sw-body-${string}` | `sw-heading-lg`;
  forceRatingMetric?: boolean;
  metricKey: string;
  metricType: string;
  small?: boolean;
  value: string | number | undefined;
}

export default function Measure({
  className,
  componentKey,
  badgeSize,
  decimals,
  fontClassName,
  metricKey,
  branchLike,
  metricType,
  forceRatingMetric,
  small,
  value,
}: Readonly<Props>) {
  const intl = useIntl();
  const classNameWithFont = classNames(className, fontClassName);

  const getTooltip = useCallback(
    () => value !== undefined && <RatingTooltipContent metricKey={metricKey} value={value} />,
    [metricKey, value],
  );

  const getLabel = useCallback(
    (rating: RatingEnum) =>
      rating
        ? intl.formatMessage({ id: 'metric.has_rating_X' }, { '0': rating })
        : intl.formatMessage({ id: 'metric.no_rating' }),
    [intl],
  );

  if (value === undefined) {
    return (
      <span
        className={classNameWithFont}
        aria-label={
          metricType === MetricType.Rating ? intl.formatMessage({ id: 'metric.no_rating' }) : ''
        }
      >
        —
      </span>
    );
  }

  if (metricType === MetricType.Level) {
    const formatted = formatMeasure(value, MetricType.Level);
    const ariaLabel = intl.formatMessage({ id: 'overview.quality_gate_x' }, { '0': formatted });

    return (
      <>
        <QualityGateIndicator
          status={(value as Status) ?? 'NONE'}
          className="sw-mr-2"
          ariaLabel={ariaLabel}
          size={small ? 'sm' : 'md'}
        />
        <span className={small ? '' : 'sw-body-md'}>{formatted}</span>
      </>
    );
  }

  if (metricType !== MetricType.Rating) {
    const formattedValue = formatMeasure(value, metricType, {
      decimals,
      omitExtraDecimalZeros: metricType === MetricType.Percent,
    });
    return <span className={classNameWithFont}>{formattedValue ?? '—'}</span>;
  }

  const rating = (
    <RatingComponent
      forceMetric={forceRatingMetric}
      branchLike={branchLike}
      size={badgeSize ?? small ? 'sm' : 'md'}
      getLabel={getLabel}
      getTooltip={getTooltip}
      componentKey={componentKey}
      ratingMetric={metricKey as MetricKey}
    />
  );

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      <span className={className} tabIndex={0}>
        {rating}
      </span>
    </>
  );
}