import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, patchUserAvatar } from '../../redux/auth/operations';
import { patchUserData } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import s from './UserSettingsForm.module.css';
import sprite from '../../assets/sprite.svg';

const schema = yup.object({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(12, 'Name must be at most 12 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dailyNorm: yup
    .number()
    .positive('Water norma must be a positive number')
    .max(15, 'The maximum water norma is 15 liters')
    .required('Water norma is required'),
});

export default function UserSettingsForm({ closeModal }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [avatar, setAvatar] = useState(null);
  const [gender, setGender] = useState(user.gender);
  const [weight, setWeight] = useState('0');
  const [activeTime, setActiveTime] = useState('0');
  const [waterNorma, setWaterNorma] = useState();
  const [customWaterNorma, setCustomWaterNorma] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!user) {
      dispatch(getUserData());
    }
  }, [dispatch, user]);

  const calculateWaterNorma = (weight, activeTime, gender) => {
    let water;
    if (weight && activeTime && gender) {
      const M = parseFloat(weight);
      const T = parseFloat(activeTime);

      if (gender === 'woman') {
        water = M * 0.03 + T * 0.4;
      } else if (gender === 'man') {
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

  const onSubmit = async data => {
    const waterInMilliliters = customWaterNorma
      ? parseFloat(customWaterNorma) * 1000
      : 0;

    const userData = {
      name: data.name || '',
      email: data.email,
      gender: data.gender,
      dailyNorm: waterInMilliliters || '',
    };

    const userId = user._id;

    try {
      dispatch(patchUserData({ userData, userId }));
      closeModal();
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleAvatarChange = async e => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('avatar', file);

      const userId = user._id;

      try {
        dispatch(patchUserAvatar({ formData, userId }));
      } catch (error) {
        console.error('Failed to update avatar:', error);
      }
    }
  };

  const handleWaterNormaChange = e => {
    const newWaterNorma = e.target.value
      .replace(/[^0-9.]/g, '')
      .replace(/\.(?=.*\.)/g, '')
      .replace(/^(\d+)\.(\d{3}).*/g, '$1.$2');
    setCustomWaterNorma(newWaterNorma);
  };

  const handleWeightChange = e => {
    let newWeight = e.target.value.replace(/[^\d]/g, '');

    if (newWeight === '') {
      newWeight = '0';
    } else if (newWeight.startsWith('0') && newWeight.length > 1) {
      newWeight = newWeight.replace(/^0+/, '');
    }

    setWeight(newWeight);
  };

  const handleActiveTimeChange = e => {
    let newActiveTime = e.target.value.replace(/[^\d.]/g, '');

    const parts = newActiveTime.split('.');
    if (parts.length > 2) {
      newActiveTime = parts[0] + '.' + parts.slice(1).join('');
    }

    if (parts.length > 1) {
      newActiveTime = parts[0] + '.' + parts[1].slice(0, 2);
    }

    if (newActiveTime === '') {
      newActiveTime = '0';
    }

    if (
      newActiveTime.startsWith('0') &&
      newActiveTime.length > 1 &&
      !newActiveTime.startsWith('0.')
    ) {
      newActiveTime = newActiveTime.replace(/^0+/, '');
    }

    setActiveTime(newActiveTime);
  };

  const handleGenderChange = e => {
    setGender(e.target.value);
  };

  useEffect(() => {
    setValue('email', user?.email || '');

    if (user?.name) {
      setValue('name', user.name);
    } else {
      setValue('name', '');
    }

    if (user?.dailyNorm) {
      setValue('dailyNorm', (user.dailyNorm / 1000).toFixed(1));
      setCustomWaterNorma((user.dailyNorm / 1000).toFixed(1));
    } else {
      setValue('dailyNorm', '');
      setWaterNorma('');
      setCustomWaterNorma('');
    }

    if (user?.gender) {
      setValue(user.gender);
    }
  }, [gender, activeTime, setValue, user]);

  return (
    <div className={s.formContainer}>
      <div className={s.avatar_container}>
        <div className={s.avatar}>
          <img className={s.avatar} src={avatar || user.avatar} alt="avatar" />
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
          accept="image/png, image/jpeg"
          onChange={handleAvatarChange}
          style={{ display: 'none' }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <div className={s.user_gender}>
          <div className={s.genderContainer}>
            <label className={s.mainLabel}>Your gender identity</label>
            <div className={s.radioButtonsContainer}>
              <div>
                <input
                  className={s.radio}
                  type="radio"
                  id="woman"
                  value="woman"
                  {...register('gender')}
                  onChange={handleGenderChange}
                  checked={gender === 'woman'}
                />
                <label
                  className={`${s.secondaryLabel} ${s.radioLabel}`}
                  htmlFor="woman"
                >
                  Woman
                </label>
              </div>

              <div>
                <input
                  className={s.radio}
                  type="radio"
                  id="man"
                  value="man"
                  {...register('gender')}
                  onChange={handleGenderChange}
                  checked={gender === 'man'}
                />
                <label
                  className={`${s.secondaryLabel} ${s.radioLabel}`}
                  htmlFor="man"
                >
                  Man
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className={s.userInfo_container}>
          <div className={s.infoContainer}>
            <div className={s.inputContainer}>
              <label className={`${s.mainLabel} ${s.forInput}`}>Name</label>
              <input
                className={`${s.input} ${errors.name ? s.errorInput : ''}`}
                type="text"
                {...register('name')}
                placeholder="Enter your name"
              />
              {errors.name && <p className={s.error}>{errors.name.message}</p>}
            </div>

            <div className={s.inputContainer}>
              <label className={`${s.mainLabel} ${s.forInput}`}>Email</label>
              <input
                className={`${s.input} ${errors.email ? s.errorInput : ''}`}
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
                className={`${s.input} ${errors.weight ? s.errorInput : ''}`}
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
                }`}
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
                className={`${s.input} ${errors.dailyNorm ? s.errorInput : ''}`}
                type="text"
                {...register('dailyNorm')}
                value={customWaterNorma}
                onChange={handleWaterNormaChange}
                placeholder="Enter your water norma"
              />
              {errors.dailyNorm && (
                <p className={s.error}>{errors.dailyNorm.message}</p>
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
