import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import s from './UserSettingsForm.module.css';
import sprite from '../../assets/sprite.svg';

// Import images
import avatarDefault from '../../assets/images/customers/defaultAvatar.png';

// Define validation schema with Yup
const schema = yup
  .object({
    name: yup
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(12, 'Name must be less than 12 characters')
      .notRequired(),
    email: yup.string().email('Invalid email').required('Email is required'),
    waterNorma: yup
      .number()
      .typeError('Must be a number')
      .positive('Must be a positive number')
      .required('Field is required'),
  })
  .required();

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState('female');
  const [weight, setWeight] = useState('0');
  const [activeTime, setActiveTime] = useState('0');
  const [waterNorma, setWaterNorma] = useState();

  const calculateWaterNorma = (weight, activeTime, gender) => {
    let water;

    if (weight && activeTime && gender) {
      const M = parseFloat(weight);
      const T = parseFloat(activeTime);

      if (gender === 'female') {
        water = M * 0.03 + T * 0.4;
      } else if (gender === 'male') {
        water = M * 0.04 + T * 0.6;
      }
    }

    return water;
  };

  useEffect(() => {
    if (gender && weight && activeTime) {
      const calculatedWater = calculateWaterNorma(weight, activeTime, gender);
      setWaterNorma(calculatedWater.toFixed(1));
    }
  }, [gender, weight, activeTime]);

  const onSubmit = data => {
    console.log(data);
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleWeightChange = e => {
    const newWeight = e.target.value.replace(/[^\d]/g, ''); // Allow only digits
    setWeight(newWeight);
  };

  const handleActiveTimeChange = e => {
    const newActiveTime = e.target.value.replace(/[^\d]/g, ''); // Allow only digits
    setActiveTime(newActiveTime);
  };

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  useEffect(() => {
    setValue('gender', gender);
    setValue('weight', weight);
    setValue('time', activeTime);
  }, [gender, weight, activeTime, setValue]);

  return (
    <div className={s.formContainer}>
      <div className={s.avatar_container}>
        <div className={s.avatar}>
          <img
            className={s.avatar}
            src={avatar || avatarDefault}
            alt="avatar"
          />
        </div>

        <label htmlFor="avatar-upload" className={s.uploadButton}>
          <svg className={s.icon} width="20" height="20">
            <use xlinkHref={`${sprite}#icon-upload`} />
          </svg>
          Upload photo
        </label>
        <input
          id="avatar-upload"
          type="file"
          className={s.fileInput}
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.userInfo_container}>
          <div className={s.genderContainer}>
            <label className={s.mainLabel}>Your gender identity</label>
            <div className={s.radioButtonsContainer}>
              <div>
                <input
                  className={s.radio}
                  type="radio"
                  id="female"
                  value="female"
                  {...register('gender')}
                  onChange={handleGenderChange}
                  checked={gender === 'female'}
                />
                <label
                  className={`${s.secondaryLabel} ${s.radioLabel}`}
                  htmlFor="female"
                >
                  Woman
                </label>
              </div>

              <div>
                <input
                  className={s.radio}
                  type="radio"
                  id="male"
                  value="male"
                  {...register('gender')}
                  onChange={handleGenderChange}
                  checked={gender === 'male'}
                />
                <label
                  className={`${s.secondaryLabel} ${s.radioLabel}`}
                  htmlFor="male"
                >
                  Man
                </label>
              </div>
            </div>
          </div>

          <div className={s.infoContainer}>
            <div className={s.inputContainer}>
              <label className={`${s.mainLabel} ${s.forInput}`}>Name</label>
              <input
                className={`${s.input} ${errors.name ? s.errorInput : ''}`} // Умова для червоного бордера
                type="text"
                {...register('name')}
                placeholder="Enter your name"
              />
              {errors.name && <p className={s.error}>{errors.name.message}</p>}
            </div>

            <div className={s.inputContainer}>
              <label className={`${s.mainLabel} ${s.forInput}`}>Email</label>
              <input
                className={`${s.input} ${errors.email ? s.errorInput : ''}`} // Умова для червоного бордера
                type="email"
                {...register('email')}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className={s.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className={s.dailyContainer}>
            <label className={s.mainLabel}>My daily norma</label>
            <div className={s.formulaContainer}>
              <div className={s.formulaExample}>
                <label className={s.secondaryLabel}>For woman:</label>
                <p className={s.formula}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className={s.formulaExample}>
                <label className={s.secondaryLabel}>For man:</label>
                <p className={s.formula}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>
            <p className={s.descriptionInfo}>
              * V is the volume of the water norm in liters per day, M is your
              body weight, T is the time of active sports, or another type of
              activity commensurate in terms of loads (in the absence of these,
              you must set 0)
            </p>
            <div className={`${s.secondaryLabel} ${s.activeTime}`}>
              <span className={s.hashSpan}>!</span>
              Active time in hours
            </div>
          </div>
        </div>

        <div className={s.water_container}>
          <div className={s.timeAndWeightContainer}>
            <div className={s.inputContainer}>
              <label className={`${s.secondaryLabel} ${s.stats}`}>
                Your weight in kilograms:
              </label>
              <input
                className={`${s.input} ${errors.weight ? s.errorInput : ''}`} // Умова для червоного бордера
                type="text"
                value={weight}
                onChange={handleWeightChange}
                placeholder="Enter your weight"
              />
            </div>

            <div className={s.inputContainer}>
              <label className={`${s.secondaryLabel} ${s.stats}`}>
                The time of active participation in sports:
              </label>
              <input
                className={`${s.input} ${
                  errors.activeTime ? s.errorInput : ''
                }`} // Умова для червоного бордера
                type="text"
                value={activeTime}
                onChange={handleActiveTimeChange}
                placeholder="Enter your time"
              />
            </div>
          </div>

          <div className={s.waterNormaContainer}>
            <label className={s.secondaryLabel}>
              The required amount of water in liters per day:
            </label>
            <span className={s.waterNorma}>{waterNorma}L</span>

            <div className={s.selectWater_norma}>
              <label className={`${s.mainLabel} ${s.stats}`}>
                Write down how much water you will drink:
              </label>
              <input
                className={`${s.input} ${
                  errors.waterNorma ? s.errorInput : ''
                }`} // Умова для червоного бордера
                type="text"
                {...register('waterNorma')}
                placeholder="Enter your water norma"
                onInput={e =>
                  (e.target.value = e.target.value.replace(/[^\d]/g, ''))
                } // Allow only digits
              />
              {errors.waterNorma && (
                <p className={s.error}>{errors.waterNorma.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className={s.btn_container}>
          <button type="submit" className={s.submitButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
