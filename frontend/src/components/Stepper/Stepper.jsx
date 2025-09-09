import React from "react";
import styles from "./Stepper.module.scss";


import userIcon from '../../assets/icons/userIcon.svg';
import pingLocalIcon from '../../assets/icons/pingLocalIcon.svg';
import cartaoIcon from '../../assets/icons/cartaoIcon.svg';

const steps = [
  { label: "Informações Pessoais", icon: userIcon },
  { label: "Endereço de Entrega", icon: pingLocalIcon },
  { label: "Pagamento", icon: cartaoIcon },
];

export default function Stepper({ currentStep = 0 }) {
  return (
    <div className={styles.stepperContainer}>
      <div className={styles.steps}>
        {steps.map((step, idx) => (
          <div key={step.label} className={styles.step}>
            <div
              className={
                idx === currentStep
                  ? styles.activeCircle
                  : styles.inactiveCircle
              }
            >
              <img
                src={step.icon}
                alt={step.label}
                className={styles.icon}
              />
            </div>
            <div
              className={
                idx === currentStep
                  ? styles.activeLabel
                  : styles.inactiveLabel
              }
            >
              {step.label}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.progressBarWrapper}>
        <div
          className={styles.progressBar}
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
